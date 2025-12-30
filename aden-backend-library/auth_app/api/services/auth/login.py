from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth import get_user_model

User = get_user_model()

def authenticate_and_generate_tokens(email, password):
    """
    Authentifiziert den Benutzer und generiert passende Tokens.
    Wird sowohl für App-Login als auch Cookie-Login genutzt.
    """

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return None, "invalid_credentials"

    if not user.is_active:
        return None, "inactive"

    user = authenticate(email=email, password=password)
    if user is None:
        return None, "invalid_credentials"

    refresh = RefreshToken.for_user(user)

    refresh["auth_method"] = "password"
    refresh["re_auth_until"] = (timezone.now() + timedelta(minutes=5)).timestamp()

    access = refresh.access_token
    access["auth_method"] = "password"
    access["re_auth_until"] = refresh["re_auth_until"]

    return user, {
        "refresh": str(refresh),
        "access": str(access),
    }
