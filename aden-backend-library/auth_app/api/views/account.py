from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from rest_framework.exceptions import AuthenticationFailed

from auth_app.api.services.account.delete import check_re_auth_or_throw, delete_user_and_logout_response
from auth_app.api.services.auth.tokens import (
    validate_password_or_throw,
    generate_reauth_tokens,
    build_response_with_reauth_tokens,
    check_reauth_valid_or_raise
)
from auth_app.api.services.account.change_email import change_user_email
from auth_app.api.services.auth.email import send_email_verification
from auth_app.tasks import send_verification_email_task


class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        check_re_auth_or_throw(request.auth)
        return delete_user_and_logout_response(request.user)
    
    response = Response(
        {"message": "Your account has been successfully deleted."},
        status=status.HTTP_200_OK
    )


class ReAuthenticateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        password = request.data.get("password")
        user = request.user

        try:
            validate_password_or_throw(user, password)
        except AuthenticationFailed:
            return Response(
                {"detail": "Email or password is invalid."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh, access = generate_reauth_tokens(user)
        return build_response_with_reauth_tokens(refresh, access)


class ChangeEmailView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        new_email = request.data.get("new_email")
        user = request.user

        if not new_email:
            return Response({"error": "No new email provided."}, status=400)

        try:
            validate_email(new_email)
        except ValidationError:
            return Response({"error": "Invalid email address."}, status=400)

        # Re-Auth check
        check_reauth_valid_or_raise(request.auth.get("re_auth_until"))

        success = change_user_email(user, new_email)
        if not success:
            return Response({"error": "Email could not be changed."}, status=400)

        # Email per Celery senden
        send_verification_email_task.delay(user.email, user.first_name)

        response = Response(
            {"message": "Your email address has been changed. Please confirm it via the link in the email."},
            status=200
        )
        
        # ✅ KORRIGIERT: Einheitlich 'samesite="None"' und KEIN 'secure'
        response.delete_cookie(
            key="refresh_token", 
            path="/", 
            samesite="None"
        )
        
        return response


class UpgradeAccountView(APIView):
    """
    ❗ IMPORTANT: This endpoint does NOT start the upgrade.
    The upgrade happens via LemonSqueezy Checkout + Webhook.
    This endpoint ONLY returns the checkout URL.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        # Worker setzt später plan = "pro" nach Webhook
        # Hier geben wir dem Frontend nur die Checkout URL zurück

        return Response({
            "checkout_url": "https://your-lemon-url-here",
            "message": "Redirecting to payment process."
        })

