from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from auth_app.api.services.auth.google import (
    verify_google_id_token,
    get_or_create_user_from_google_data,
    build_google_auth_response,
    verify_google_token_for_user,
    build_google_reauth_response
)
from auth_app.api.throttles import GoogleLoginThrottle

User = get_user_model()


class GoogleLoginView(APIView):
    throttle_classes = [GoogleLoginThrottle]

    def post(self, request):
        token = request.data.get('id_token')

        if not token:
            return Response(
                {'error': 'Google token is missing.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        idinfo = verify_google_id_token(token)

        if not idinfo:
            return Response(
                {'error': 'Google token is invalid or expired.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # User is created or retrieved
        user = get_or_create_user_from_google_data(idinfo)

        # JWT tokens + cookie response
        return build_google_auth_response(user)


class GoogleReAuthView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = request.data.get("id_token")

        if not token:
            return Response(
                {"error": "No Google token provided."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Token does NOT belong to the same user
        if not verify_google_token_for_user(token, request.user):
            return Response(
                {"error": "Token is invalid or does not belong to the user."},
                status=status.HTTP_403_FORBIDDEN
            )

        # User is authenticated & Google token matches
        return build_google_reauth_response(request.user)
