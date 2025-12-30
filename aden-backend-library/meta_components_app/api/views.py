from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django.shortcuts import get_object_or_404
from meta_components_app.models import Component, ComponentLike, ComponentSave 
from .serializers import ComponentSerializer
from rest_framework.views import APIView

# Liste & Erstellen
class ComponentListView(generics.ListCreateAPIView):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer


    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

# NEU: Detail-Ansicht für EINE Komponente (GET per Slug)
class ComponentDetailView(generics.RetrieveAPIView):
    queryset = Component.objects.all()
    serializer_class = ComponentSerializer

    # WICHTIG: Das sagt Django, dass wir in der URL nach 'slug' suchen, nicht nach 'id'
    lookup_field = 'slug'

# Liken (Toggle)
class ComponentLikeToggleView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, slug):
        component = get_object_or_404(Component, slug=slug)
        user = request.user
        
        # Check ob Like existiert
        like_query = ComponentLike.objects.filter(user=user, component=component)

        if like_query.exists():
            like_query.delete()
            # Counter runterzählen
            if component.likes_count > 0:
                component.likes_count -= 1
                component.save()
            return Response({'status': 'unliked', 'likes_count': component.likes_count}, status=status.HTTP_200_OK)
        else:
            ComponentLike.objects.create(user=user, component=component)
            # Counter hochzählen
            component.likes_count += 1
            component.save()
            return Response({'status': 'liked', 'likes_count': component.likes_count}, status=status.HTTP_201_CREATED)
        
class ComponentSaveToggleView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, slug):
        component = get_object_or_404(Component, slug=slug)
        user = request.user
        
        # Check ob Save existiert
        save_query = ComponentSave.objects.filter(user=user, component=component)

        if save_query.exists():
            save_query.delete()
            return Response({'status': 'unsaved'}, status=status.HTTP_200_OK)
        else:
            ComponentSave.objects.create(user=user, component=component)
            return Response({'status': 'saved'}, status=status.HTTP_201_CREATED)