import os
from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver
from django.conf import settings
from auth_app.models import CustomUser


@receiver(pre_save, sender=CustomUser)
def delete_old_profile_picture(sender, instance, **kwargs):
    if not instance.pk:
        return  

    try:
        old_instance = CustomUser.objects.get(pk=instance.pk)
    except CustomUser.DoesNotExist:
        return

    if old_instance.photo and old_instance.photo != instance.photo:
        old_photo_path = old_instance.photo.path
        if os.path.isfile(old_photo_path):
            os.remove(old_photo_path)

@receiver(post_delete, sender=CustomUser)
def delete_profile_image_on_user_delete(sender, instance, **kwargs):
    if instance.photo:
        if os.path.isfile(instance.photo.path):
            instance.photo.delete(save=False)