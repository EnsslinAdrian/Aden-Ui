from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied
from rest_framework.response import Response
from datetime import timedelta, datetime
from django.utils import timezone
from datetime import timezone as dt_timezone


# --------------------------------------------------------
# 1. Access Token aus Cookie Refresh Token erzeugen
# --------------------------------------------------------
def refresh_access_token_from_cookie(cookie_token: str):
    try:
        refresh = RefreshToken(cookie_token)
        access = refresh.access_token

        # Claims übernehmen
        access["auth_method"] = refresh.get("auth_method")
        access["re_auth_until"] = refresh.get("re_auth_until")

        return str(access), None

    except Exception:
        return None, "invalid_or_expired"


# --------------------------------------------------------
# 2. Authentifizierungsstatus prüfen
# --------------------------------------------------------
def get_auth_status_from_cookie(cookie_token: str):
    try:
        refresh = RefreshToken(cookie_token)
        user_id = refresh.payload.get("user_id")
        return {"authenticated": True, "user_id": user_id}
    except Exception:
        return {"authenticated": False}


# --------------------------------------------------------
# 3. Passwort für ReAuth prüfen
# --------------------------------------------------------
def validate_password_or_throw(user, password):
    if not password:
        raise AuthenticationFailed("No password provided.")

    if not user.check_password(password):
        raise AuthenticationFailed("Incorrect password.")


# --------------------------------------------------------
# 4. ReAuth Tokens generieren
# --------------------------------------------------------
def generate_reauth_tokens(user, minutes=5):
    refresh = RefreshToken.for_user(user)
    access = refresh.access_token

    re_auth_until = (timezone.now() + timedelta(minutes=minutes)).timestamp()

    for token in (refresh, access):
        token["auth_method"] = "password"
        token["re_auth_until"] = re_auth_until

    return str(refresh), str(access)


# --------------------------------------------------------
# 5. ReAuth Response inkl. Cookie
# --------------------------------------------------------
def build_response_with_reauth_tokens(refresh_token, access_token):
    response = Response(
        {
            "message": "You have been successfully authenticated.",
            "access": access_token,
        },
        status=200
    )

    # 🔥 Perfekte Cookie-Parameter
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,         # Chrome/Safari/iOS erforderlich
        samesite="None",     # wichtig für cross-site
        max_age=5 * 60,      # 5 Minuten gültig
        path="/"
    )
    return response


# --------------------------------------------------------
# 6. ReAuth Gültigkeit prüfen
# --------------------------------------------------------
def check_reauth_valid_or_raise(re_auth_until):
    if not re_auth_until:
        raise PermissionDenied("⚠️ Please re-authenticate.")

    timestamp_dt = datetime.fromtimestamp(re_auth_until, tz=dt_timezone.utc)

    if timestamp_dt < timezone.now():
        raise PermissionDenied("⏳ Re-authentication has expired.")
