from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from auth_app.api.services.auth.password_reset import (
    get_user_from_uid,
    is_valid_reset_token,
    set_new_password,
    get_user_by_email,
    generate_password_reset_link,
)
from auth_app.api.services.auth.email import send_password_reset_email
from auth_app.api.throttles import PasswordResetRequestThrottle, PasswordResetConfirmThrottle
from auth_app.tasks import send_password_reset_email_task


class PasswordResetConfirmView(APIView):
    throttle_classes = [PasswordResetConfirmThrottle]

    def post(self, request):
        uid = request.data.get('uid')
        token = request.data.get('token')
        new_password = request.data.get('new_password')

        user = get_user_from_uid(uid)
        if not user:
            return Response({"message": "User could not be found."}, status=status.HTTP_400_BAD_REQUEST)

        if not is_valid_reset_token(user, token):
            return Response({"message": "The link is invalid or expired."}, status=status.HTTP_400_BAD_REQUEST)

        set_new_password(user, new_password)

        return Response({"message": "Your password has been successfully changed."})


class PasswordResetRequestView(APIView):
    throttle_classes = [PasswordResetRequestThrottle]

    def post(self, request):
        email = request.data.get('email')
        user = get_user_by_email(email)

        # Security: Never reveal whether the user exists
        if not user:
            return Response(
                {"message": "📧 If this email is registered, a reset link has been sent."},
                status=status.HTTP_200_OK
            )

        reset_url = generate_password_reset_link(user)

        # Background email via Celery
        send_password_reset_email_task.delay(user.email, reset_url)

        return Response(
            {"message": "📧 If this email is registered, a reset link has been sent."},
            status=status.HTTP_200_OK
        )
