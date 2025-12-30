from django.conf import settings


def set_refresh_cookie_if_needed(response, refresh_token, stay_logged_in):
    is_prod = not settings.DEBUG  # Prod = HTTPS, Local = kein HTTPS

    cookie_args = {
        "key": "refresh_token",
        "value": refresh_token,
        "httponly": True,
        "secure": True if is_prod else False,      # Chrome verlangt Secure nur in Prod
        "samesite": "None" if is_prod else "Lax",  # verhindert lokale Cookie-Probleme
        "path": "/",                                # wichtig für Logout
    }

    # 7 Tage nur wenn stay_logged_in angehakt
    if stay_logged_in:
        cookie_args["max_age"] = 7 * 24 * 60 * 60

    # Ohne stay_logged_in → Session Cookie
    response.set_cookie(**cookie_args)

    return response
