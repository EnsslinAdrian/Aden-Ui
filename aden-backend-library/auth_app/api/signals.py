from django.db.models.signals import post_delete
from django.dispatch import receiver
from auth_app.models import CustomUser

@receiver(post_delete, sender=CustomUser)
def delete_profile_image_on_user_delete(sender, instance, **kwargs):
    if instance.photo:
        storage = instance.photo.storage
        name = instance.photo.name

        if storage.exists(name):
            storage.delete(name)
