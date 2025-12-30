from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateAPIView, ListAPIView
from rest_framework import status
from rest_framework.exceptions import ValidationError
from django.conf import settings
from django.shortcuts import get_object_or_404
from auth_app.api.serializers import UserDetailSerializer, PublicUserSerializer, MemberComponentSerializer
from auth_app.models import CustomUser
from meta_components_app.models import Component


class UserListView(ListAPIView):
    """
    Admin-only View: Lists all users (except in DEBUG mode).
    """
    queryset = CustomUser.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [] if settings.DEBUG else [IsAdminUser]


class UserProfileView(RetrieveUpdateAPIView):
    """
    Returns or updates the user's own profile.
    Der UserDetailSerializer liefert jetzt automatisch:
    - User Infos
    - created_components
    - saved_components (echte Saves)
    - total_likes
    """
    serializer_class = UserDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError:
            return Response(
                {"message": "Your profile could not be updated."},
                status=status.HTTP_400_BAD_REQUEST
            )

        self.perform_update(serializer)

        response_data = dict(serializer.data)
        response_data["message"] = "Your profile has been successfully updated."
        
        return Response(response_data, status=status.HTTP_200_OK)


class MemberProfileView(APIView):
    """
    Public Profile View:
    Sucht User via Username.
    Der PublicUserSerializer liefert automatisch:
    - User Infos (Public)
    - created_components (Liste)
    - total_likes
    """
    permission_classes = [AllowAny]

    def get(self, request, username):
        # 1. User suchen (Case Insensitive)
        user = get_object_or_404(CustomUser, username__iexact=username)
        
        # 2. Serializer aufrufen (Er erledigt jetzt die Arbeit mit den Components!)
        serializer = PublicUserSerializer(user, context={'request': request})

        # 3. JSON zurückgeben (Kein manuelles Zusammenbauen mehr nötig)
        return Response(serializer.data, status=status.HTTP_200_OK)