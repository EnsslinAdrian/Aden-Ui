from rest_framework.views import APIView
from django.core.signing import TimestampSigner, BadSignature, SignatureExpired
from rest_framework.response import Response
from auth_app.models import CustomUser
from rest_framework import status
from auth_app.api.services.auth.register import register_user
from auth_app.api.throttles import RegisterThrottle, VerifyEmailThrottle, ResendVerifyEmailThrottle
from auth_app.api.services.auth.password_reset import get_user_by_email
from rest_framework.exceptions import ValidationError
from config_app.utils.recaptcha import verify_recaptcha
from auth_app.tasks import send_verification_email_task
signer = TimestampSigner()


class RegisterView(APIView):
    throttle_classes = [RegisterThrottle]

    def post(self, request):
        captcha_token = request.data.get("captcha")

        try:
            verify_recaptcha(captcha_token, action="REGISTER")
        except ValidationError as e:
            return Response({'captcha': [str(e)]}, status=status.HTTP_400_BAD_REQUEST)

        # User creation
        result = register_user(request.data)

        if result["success"]:
            return Response(
                {"message": "Please check your email to activate your account."},
                status=status.HTTP_201_CREATED
            )

        # Duplicate email -> don't reveal if it exists
        errors = result.get("errors", {})
        email_errors = errors.get("email")
        if email_errors and any("existiert" in e for e in email_errors):
            return Response(
                {"message": "If this email address is registered with us, you will receive an email shortly."},
                status=status.HTTP_201_CREATED
            )

        return Response(errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmailView(APIView):
    throttle_classes = [VerifyEmailThrottle]

    def get(self, request):
        token = request.query_params.get("token")

        try:
            email = signer.unsign(token, max_age=60 * 60 * 24)
            user = CustomUser.objects.get(email=email)

            user.is_active = True
            user.save()

            return Response({"message": "✅ Email confirmed. You can now log in."})

        except CustomUser.DoesNotExist:
            return Response({"message": "❌ No user found with this email."}, status=404)

        except SignatureExpired:
            return Response({"message": "❌ The confirmation link has expired."}, status=400)

        except BadSignature:
            return Response({"message": "❌ The confirmation link is invalid."}, status=400)

        except Exception as e:
            return Response({"message": f"❌ Internal error: {str(e)}"}, status=500)


class ResendVerificationEmailView(APIView):
    throttle_classes = [ResendVerifyEmailThrottle]

    def post(self, request):
        email = request.data.get("email")
        user = get_user_by_email(email)

        if not user:
            return Response({"message": "❌ No user found with this email."}, status=400)

        if user.is_active:
            return Response({"message": "✅ This email has already been confirmed."}, status=200)

        # Background email via Celery
        send_verification_email_task.delay(user.email, user.first_name)

        return Response({"message": "The verification link has been resent."}, status=200)

