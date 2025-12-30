from auth_app.api.serializers import RegisterSerializer
from auth_app.tasks import send_verification_email_task


def register_user(data):
    serializer = RegisterSerializer(data=data)

    if not serializer.is_valid():
        return {
            "success": False,
            "errors": serializer.errors
        }

    user = serializer.save()

    try:
        send_verification_email_task.delay(
            user.email,
            user.first_name or ""
        )
    except Exception as e:
        return {
            "success": True,
            "user": user,
            "email_error": str(e)
        }

    return {
        "success": True,
        "user": user
    }
