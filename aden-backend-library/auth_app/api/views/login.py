from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated

from auth_app.api.services.auth.login import authenticate_and_generate_tokens
from auth_app.api.services.auth.cookies import set_refresh_cookie_if_needed
from auth_app.api.services.auth.tokens import (
    refresh_access_token_from_cookie,
    get_auth_status_from_cookie
)

from auth_app.api.throttles import LoginThrottle


class CustomLoginView(TokenObtainPairView):
    throttle_classes = [LoginThrottle]

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")
        stay_logged_in = request.data.get("stay_logged_in", False)

        user, result = authenticate_and_generate_tokens(email, password)

        if result == "invalid_credentials":
            return Response(
                {"error": "Invalid credentials."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        if result == "inactive":
            return Response(
                {"error": "Please confirm your email address to activate your account."},
                status=status.HTTP_403_FORBIDDEN
            )

        # result contains access + refresh token
        response = Response(
            {"access": result["access"]},
            status=status.HTTP_200_OK
        )

        # Set refresh cookie if stay signed in
        set_refresh_cookie_if_needed(response, result["refresh"], stay_logged_in)

        return response


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        response = Response({"message": "You have been successfully logged out."}, status=200)

        response.delete_cookie(
            key="refresh_token",
            path="/",
            samesite="None"
        )

        return response


class RefreshAccessTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response(
                {"detail": "No refresh token found."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        access, error = refresh_access_token_from_cookie(refresh_token)

        if error == "invalid_or_expired":
            return Response(
                {'detail': 'Invalid or expired refresh token.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        return Response({'access': access}, status=200)


class AuthStatusView(APIView):
    """
    Used to check in the frontend whether:
    - User is logged in
    - Which subscription they have
    - Will be useful later for premium system
    """
    permission_classes = [AllowAny]

    def get(self, request):
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response(
                {"authenticated": False},
                status=status.HTTP_200_OK
            )

        result = get_auth_status_from_cookie(refresh_token)
        return Response(result, status=200)
