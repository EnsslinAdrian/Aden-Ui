from rest_framework import serializers
from django.contrib.auth import get_user_model
from meta_components_app.models import Component, ComponentLike, ComponentSave

User = get_user_model()

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 
            'username',
            'first_name', 
            'last_name', 
            'photo'
        ]

class ComponentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    is_liked_by_user = serializers.SerializerMethodField()
    is_saved_by_user = serializers.SerializerMethodField() # <--- NEU
    
    class Meta:
        model = Component
        fields = [
            'id', 'author', 'category', 'subcategory', 'is_premium', 'slug', 'title', 
            'likes_count', 'created_at', 
            'is_liked_by_user', 
            'is_saved_by_user' # <--- NEU
        ]
        read_only_fields = ['likes_count', 'author', 'is_liked_by_user', 'is_saved_by_user'] 

    def get_is_liked_by_user(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return ComponentLike.objects.filter(user=request.user, component=obj).exists()
        return False

    def get_is_saved_by_user(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            # Check in der neuen Tabelle ComponentSave
            return ComponentSave.objects.filter(user=request.user, component=obj).exists()
        return False

class ComponentLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComponentLike
        fields = ['id', 'user', 'component']