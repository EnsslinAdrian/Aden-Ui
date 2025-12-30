from google.oauth2 import id_token
from google.auth.transport import requests
from django.utils import timezone
from datetime import timedelta
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from auth_app.models import CustomUser


# --------------------------------------------------------
# 1. Token Verification
# --------------------------------------------------------
def verify_google_id_token(token: str):
    """
    Validates the Google ID Token.
    Returns user info or None.
    """
    try:
        return id_token.verify_oauth2_token(token, requests.Request())
    except ValueError:
        return None


# --------------------------------------------------------
# 2. Find or Create User
# --------------------------------------------------------
def get_or_create_user_from_google_data(data):
    email = data["email"]
    first_name = data.get("given_name", "")
    last_name = data.get("family_name", "")

    user, created = CustomUser.objects.get_or_create(email=email)

    if created:
        user.first_name = first_name
        user.last_name = last_name
        user.plan = "free"          # default
        user.is_active = True       # Google login is automatically verified
        user.save()

    return user


# --------------------------------------------------------
# 3. Login → Returns Access Token + Sets Refresh Cookie
# --------------------------------------------------------
def build_google_auth_response(user):
    refresh = RefreshToken.for_user(user)

    # Extra Claims
    refresh["auth_method"] = "google"
    refresh["re_auth_until"] = (timezone.now() + timedelta(minutes=5)).timestamp()

    access = refresh.access_token
    access["auth_method"] = "google"
    access["re_auth_until"] = refresh["re_auth_until"]

    response = Response(
        {"access": str(access)},
        status=200
    )

    # set refresh_token cookie
    response.set_cookie(
        key="refresh_token",
        value=str(refresh),
        httponly=True,
        secure=True,        # important for Chrome & iOS
        samesite="None",    # otherwise Chrome blocks the cookie
        max_age=7 * 24 * 60 * 60,  # 7 days
        path="/"
    )

    return response


# --------------------------------------------------------
# 4. Verify ReAuth Token (e.g., when changing email)
# --------------------------------------------------------
def verify_google_token_for_user(id_token_str, user):
    try:
        idinfo = id_token.verify_oauth2_token(id_token_str, requests.Request())
        return idinfo.get("email") == user.email
    except ValueError:
        return False


# --------------------------------------------------------
# 5. ReAuth → New Refresh + Access Token
# --------------------------------------------------------
def build_google_reauth_response(user):
    refresh = RefreshToken.for_user(user)

    refresh["auth_method"] = "google"
    refresh["re_auth_until"] = (timezone.now() + timedelta(minutes=5)).timestamp()

    access = refresh.access_token
    access["auth_method"] = "google"
    access["re_auth_until"] = refresh["re_auth_until"]

    response = Response(
        {
            "message": "Re-authentication via Google successful.",
            "access": str(access),
        },
        status=200
    )

    # Corrected: same cookie parameters as during login!  
    response.set_cookie(
        key="refresh_token",
        value=str(refresh),
        httponly=True,
        secure=True,         # previously incorrect (False) → now correct!
        samesite="None",     # previously Lax → does NOT work on Chrome!
        max_age=5 * 60,      # 5 minutes valid ReAuth state
        path="/"
    )

    return response
