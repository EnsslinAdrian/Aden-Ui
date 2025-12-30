import hashlib
import hmac
import json
from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from auth_app.models import CustomUser

@csrf_exempt # Wichtig: Webhooks haben keinen CSRF Token
def lemonsqueezy_webhook(request):
    # 1. Nur POST erlauben
    if request.method != "POST":
        return HttpResponse("Method not allowed", status=405)

    # 2. Signatur prüfen (Sicherheit!)
    # Lemon Squeezy schickt einen Hash im Header 'X-Signature'.
    # Wir müssen prüfen, ob der mit unserem Secret übereinstimmt.
    secret = settings.LEMON_SQUEEZY_WEBHOOK_SECRET
    signature = request.headers.get("X-Signature")
    
    if not signature or not secret:
        return HttpResponse("No signature or secret found", status=400)

    # Body lesen und hashen
    body = request.body
    digest = hmac.new(
        secret.encode("utf-8"),
        body,
        digestmod=hashlib.sha256
    ).hexdigest()

    # Vergleich (Nutze compare_digest gegen Timing Attacks)
    if not hmac.compare_digest(digest, signature):
        return HttpResponse("Invalid signature", status=401)

    # 3. Daten verarbeiten
    try:
        data = json.loads(body)
        event_name = data.get("meta", {}).get("event_name")
        payload = data.get("data", {}).get("attributes", {})
        
        # Hier holen wir die User-ID, die wir vom Frontend mitgeschickt haben
        custom_data = data.get("meta", {}).get("custom_data", {})
        user_id = custom_data.get("user_id")

        if not user_id:
            # Fallback: Versuchen über Email zu finden (weniger sicher, aber okay)
            email = payload.get("user_email")
            try:
                user = CustomUser.objects.get(email=email)
            except CustomUser.DoesNotExist:
                return HttpResponse("User not found", status=200) # 200 damit LS nicht nochmal sendet
        else:
            try:
                user = CustomUser.objects.get(id=user_id)
            except CustomUser.DoesNotExist:
                return HttpResponse("User ID invalid", status=200)

        # 4. Logik basierend auf Event
        if event_name == "order_created":
            # EINMALZAHLUNG (Lifetime) erfolgreich
            if payload.get("status") == "paid":
                user.is_premium = True
                user.plan = "lifetime"
                # Speichere IDs für spätere Referenz
                user.lemon_customer_id = payload.get("customer_id")
                user.save()
                print(f"SUCCESS: User {user.email} is now Premium (Lifetime)!")

        elif event_name == "subscription_created":
            # ABO gestartet (für später)
            if payload.get("status") == "active":
                user.is_premium = True
                user.plan = "pro_subscription"
                user.lemon_subscription_id = payload.get("subscription_id")
                user.lemon_customer_id = payload.get("customer_id")
                user.save()

        elif event_name == "subscription_cancelled":
            # ABO gekündigt (läuft noch bis Periodenende, Logik hier vereinfacht)
            # Normalerweise checkt man "ends_at". Fürs erste setzen wir es auf Free.
            pass 
            # user.is_premium = False ... (Das machen wir später feiner)

        return HttpResponse("Webhook processed", status=200)

    except Exception as e:
        print(f"Webhook Error: {e}")
        return HttpResponse("Server Error", status=500)