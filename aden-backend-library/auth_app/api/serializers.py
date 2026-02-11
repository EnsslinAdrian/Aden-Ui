from rest_framework import serializers
from auth_app.models import CustomUser
from django.contrib.auth.password_validation import validate_password
from config_app.utils.fields import AbsoluteImageUrlField
from auth_app.api.utils.generate_username import generate_unique_username
from meta_components_app.models import Component
from django.db.models import Sum
from meta_components_app.models import Component, ComponentSave 
from auth_app.api.utils.image_utils import optimize_user_image

class MemberComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = ['id', 'title', 'slug', 'category', 'subcategory', 'likes_count']
        

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        email = validated_data['email']
        generated_username = generate_unique_username(validated_data.get('first_name', ''), validated_data.get('last_name', ''), email)
        user = CustomUser.objects.create_user(
            email=email,
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            username=generated_username 
        )
        user.is_active = False     
        user.plan = "free"
        user.is_premium = False
        user.save()
        return user

   
class UserDetailSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(required=False)
    github_url = serializers.URLField(required=False, allow_null=True, allow_blank=True)
    linkedin_url = serializers.URLField(required=False, allow_null=True, allow_blank=True)
    created_components = serializers.SerializerMethodField()
    saved_components = serializers.SerializerMethodField()
    total_likes = serializers.SerializerMethodField() 

    class Meta:
        model = CustomUser
        fields = [
            'id', 'email', 'username', 'first_name', 'last_name',
            'photo', 'bio', 'github_url', 'linkedin_url',
            'plan', 'is_premium', 'lemon_order_portal_url', 'date_joined', 'updated_at',
            'created_components', 'saved_components', 'total_likes'
        ]
        read_only_fields = ['id', 'email', 'username', 'plan', 'is_premium', 'lemon_order_portal_url', 'date_joined', 'updated_at']

    def get_created_components(self, obj):
        comps = Component.objects.filter(author=obj).order_by('-created_at')
        return MemberComponentSerializer(comps, many=True).data

    def get_saved_components(self, obj):
        saved_ids = ComponentSave.objects.filter(user=obj).values_list('component_id', flat=True)
        comps = Component.objects.filter(id__in=saved_ids).order_by('-created_at')
        return MemberComponentSerializer(comps, many=True).data

    def get_total_likes(self, obj):
        return obj.components.aggregate(total=Sum('likes_count'))['total'] or 0
    
    def update(self, instance, validated_data):
        new_photo = validated_data.pop("photo", None)
    
        if new_photo:
            # 🔥 ALTES BILD LÖSCHEN
            if instance.photo:
                if instance.photo.storage.exists(instance.photo.name):
                    instance.photo.delete(save=False)
    
            # 🔥 NEUES BILD OPTIMIEREN (Name kommt vom Upload)
            optimized = optimize_user_image(new_photo)
    
            instance.photo.save(
                optimized.name,
                optimized,
                save=False
            )
    
        return super().update(instance, validated_data)
    

class PublicUserSerializer(serializers.ModelSerializer):
    photo = AbsoluteImageUrlField(required=False, allow_null=True)
    total_likes = serializers.SerializerMethodField()
    created_components = serializers.SerializerMethodField() # <--- NEU: Direkt hier drin

    class Meta:
        model = CustomUser
        fields = [
            'first_name', 'last_name', 'username', 
            'photo', 'bio', 'is_premium', 
            'github_url', 'linkedin_url', 'date_joined',
            'total_likes',
            'created_components' 
        ]

    def get_total_likes(self, obj):
        # Member Req 1: Likes auf deren Components
        return obj.components.aggregate(total=Sum('likes_count'))['total'] or 0

    def get_created_components(self, obj):
        # Member Req 2: Deren Components anzeigen
        comps = Component.objects.filter(author=obj).order_by('-created_at')
        return MemberComponentSerializer(comps, many=True).data