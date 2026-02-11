from django.utils import timezone
from datetime import timedelta
from auth_app.models import CustomUser
from auth_app.api.services.auth.email import send_verification_warning_email
from django.core.signing import Signer
from django.conf import settings

signer = Signer()

def delete_inactive_users_sync():
    limit = timezone.now() - timedelta(hours=48)
    users = CustomUser.objects.filter(is_active=False, date_joined__lt=limit)

    count = users.count()

    for user in users:
        user.delete()

    return count

def warn_inactive_users_sync():
    limit = timezone.now() - timedelta(hours=24)
    users = CustomUser.objects.filter(is_active=False, date_joined__lt=limit)

    for user in users:
        token = signer.sign(user.email)
        verify_url = f"{settings.FRONTEND_VERIFY_URL}?token={token}"
        send_verification_warning_email(user, verify_url)

    return users.count()
