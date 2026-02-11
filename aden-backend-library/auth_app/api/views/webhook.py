import hashlib
import hmac
import json
from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from auth_app.models import CustomUser

@csrf_exempt
def lemonsqueezy_webhook(request):
    if request.method != "POST":
        return HttpResponse("Method not allowed", status=405)

    secret = settings.LEMON_SQUEEZY_WEBHOOK_SECRET
    signature = request.headers.get("X-Signature")
    
    if not signature or not secret:
        return HttpResponse("No signature or secret found", status=400)

    body = request.body
    digest = hmac.new(
        secret.encode("utf-8"),
        body,
        digestmod=hashlib.sha256
    ).hexdigest()

    if not hmac.compare_digest(digest, signature):
        return HttpResponse("Invalid signature", status=401)

    try:
        data = json.loads(body)
        event_name = data.get("meta", {}).get("event_name")
        payload = data.get("data", {}).get("attributes", {})
        custom_data = data.get("meta", {}).get("custom_data", {})
        user_id = custom_data.get("user_id")

        if not user_id:
            email = payload.get("user_email")
            try:
                user = CustomUser.objects.get(email=email)
            except CustomUser.DoesNotExist:
                return HttpResponse("User not found", status=200)
        else:
            try:
                user = CustomUser.objects.get(id=user_id)
            except CustomUser.DoesNotExist:
                return HttpResponse("User ID invalid", status=200)

        if event_name == "order_created":
            if payload.get("status") == "paid":  
                user.is_premium = True
                user.plan = "lifetime"
                user.lemon_customer_id = str(payload.get("customer_id"))
                
                urls = payload.get("urls", {})
                portal_url = urls.get("customer_portal") or urls.get("receipt")
                user.lemon_order_portal_url = portal_url
                
                user.save()
                print(f"SUCCESS: User {user.email} is now Premium (Lifetime)!")

        elif event_name == "subscription_created":
            if payload.get("status") == "active":
                user.is_premium = True
                user.plan = "pro_subscription"
                user.lemon_subscription_id = payload.get("subscription_id")
                user.lemon_customer_id = payload.get("customer_id")
                user.save()

        elif event_name == "subscription_cancelled":
            pass 

        return HttpResponse("Webhook processed", status=200)

    except Exception as e:
        print(f"Webhook Error: {e}")
        return HttpResponse("Server Error", status=500)