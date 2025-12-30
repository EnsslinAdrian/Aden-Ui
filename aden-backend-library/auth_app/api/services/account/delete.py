from datetime import datetime, timezone as dt_timezone
from django.utils import timezone
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework import status


# --------------------------------------------------------
# 1. Check re-authentication (for account deletion)
# --------------------------------------------------------
def check_re_auth_or_throw(token):
    """
    Checks if the user has re-authenticated in the last few minutes.
    Tokens contain 're_auth_until'.
    """
    re_auth_until = token.get("re_auth_until")

    if not re_auth_until:
        raise PermissionDenied("⚠️ Please re-authenticate to perform this action.")

    expires = datetime.fromtimestamp(re_auth_until, tz=dt_timezone.utc)

    if expires < timezone.now():
        raise PermissionDenied("⏳ Your re-authentication has expired.")


# --------------------------------------------------------
# 2. Delete user & safely logout
# --------------------------------------------------------
def delete_user_and_logout_response(user):
    try:
        user.delete()
    except Exception:
        return Response(
            {"message": "Account could not be deleted."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    response = Response(
        {"message": "Your account has been successfully deleted."},
        status=status.HTTP_200_OK
    )

    # ✅ CORRECTED: 'secure=True' removed!
    # Django only allows key, path, domain and samesite when deleting.
    response.delete_cookie(
        key="refresh_token",
        path="/",
        samesite="None"
    )

    return response
