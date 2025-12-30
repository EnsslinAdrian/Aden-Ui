from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.conf import settings
from auth_app.models import CustomUser


# --------------------------------------------------------
# Benutzer anhand der UID entschlüsseln
# --------------------------------------------------------
def get_user_from_uid(uid_b64: str):
    try:
        uid = urlsafe_base64_decode(uid_b64).decode()
        return CustomUser.objects.get(pk=uid)
    except (ValueError, CustomUser.DoesNotExist, TypeError):
        return None


# --------------------------------------------------------
# Token validieren
# --------------------------------------------------------
def is_valid_reset_token(user, token: str) -> bool:
    if not user:
        return False
    return default_token_generator.check_token(user, token)


# --------------------------------------------------------
# Neues Passwort setzen
# --------------------------------------------------------
def set_new_password(user, password: str):
    user.set_password(password)
    user.save(update_fields=["password"])


# --------------------------------------------------------
# Benutzer anhand E-Mail finden (case insensitive)
# --------------------------------------------------------
def get_user_by_email(email: str):
    try:
        return CustomUser.objects.get(email__iexact=email)
    except CustomUser.DoesNotExist:
        return None


# --------------------------------------------------------
# Passwort-Reset-Link generieren
# --------------------------------------------------------
def generate_password_reset_link(user):
    """
    Baut den passwort-reset URL für das Frontend.
    """
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))

    return f"{settings.FRONTEND_RESET_URL}?uid={uid}&token={token}"
