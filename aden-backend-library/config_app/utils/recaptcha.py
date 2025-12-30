import requests
from django.conf import settings
from rest_framework.exceptions import ValidationError
import logging

# Optional: Logger, damit du Fehler in der Konsole siehst
logger = logging.getLogger(__name__)

def verify_recaptcha(token: str, action: str = "REGISTER"):
    if not token:
        raise ValidationError("reCAPTCHA fehlt.")

    url = (
        f"https://recaptchaenterprise.googleapis.com/v1/projects/"
        f"{settings.RECAPTCHA_PROJECT_ID}/assessments?key={settings.RECAPTCHA_API_KEY}"
    )

    payload = {
        "event": {
            "token": token,
            "siteKey": settings.RECAPTCHA_SITE_KEY,
            "expectedAction": action,
        }
    }

    try:
        response = requests.post(url, json=payload, timeout=5) # Timeout wichtig!
        response.raise_for_status() # Wirft Fehler bei 4xx/5xx HTTP Codes
        result = response.json()
    except Exception as e:
        logger.error(f"ReCaptcha Verbindung fehlgeschlagen: {e}")
        # Im Zweifel: User durchlassen oder blockieren? Hier blockieren wir sicherheitshalber.
        raise ValidationError("Verbindung zu reCAPTCHA fehlgeschlagen.")

    # 1. Token gültig?
    token_props = result.get("tokenProperties", {})
    if not token_props.get("valid", False):
        invalid_reason = token_props.get("invalidReason", "Unbekannt")
        logger.warning(f"ReCaptcha Token ungültig: {invalid_reason}")
        raise ValidationError("Token ungültig oder abgelaufen.")

    # 2. Action korrekt?
    if token_props.get("action") != action:
        raise ValidationError("Ungültige Aktion.")

    # 3. Score checken (Sicherer Zugriff mit .get)
    risk_analysis = result.get("riskAnalysis", {})
    score = risk_analysis.get("score", 0.0) # Fallback auf 0.0 wenn fehlt
    
    if score < 0.5:
        logger.warning(f"ReCaptcha Score zu niedrig: {score}")
        raise ValidationError("reCAPTCHA Bewertung zu niedrig.")

    return True