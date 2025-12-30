from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.core.files.base import ContentFile
from auth_app.api.utils.image_utils import optimize_user_image

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email ist erforderlich")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True, blank=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    photo = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)

    is_premium = models.BooleanField(default=False)
    plan = models.CharField(max_length=50, default="free")

    lemon_customer_id = models.CharField(max_length=200, blank=True, null=True)
    lemon_subscription_id = models.CharField(max_length=200, blank=True, null=True)

    date_joined = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        try:
            old_photo = CustomUser.objects.get(pk=self.pk).photo
        except CustomUser.DoesNotExist:
            old_photo = None

        super().save(*args, **kwargs)

        # Bild optimieren (ausgelagert!)
        if self.photo:
            optimized_file = optimize_user_image(self.photo, self.pk)
            self.photo.save(optimized_file.name, optimized_file, save=False)
            super().save(update_fields=["photo"])

        # Altes Bild löschen
        if old_photo and old_photo != self.photo:
            old_photo.delete(save=False)

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = "Benutzer"
        verbose_name_plural = "Benutzer"
        
