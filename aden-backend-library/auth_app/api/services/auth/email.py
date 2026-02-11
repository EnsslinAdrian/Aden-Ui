from django.core.signing import TimestampSigner
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string

signer = TimestampSigner()


def send_email_verification(email: str, first_name: str = ""):
    token = signer.sign(email)
    verify_url = f"{settings.FRONTEND_VERIFY_URL}?token={token}"

    subject = "📧 Please confirm your email address"
    from_email = settings.DEFAULT_FROM_EMAIL

    context = {
        "first_name": first_name,
        "verify_url": verify_url,
    }

    html_content = render_to_string("verify_email.html", context)
    text_content = f"Please confirm your email via this link:\n{verify_url}"

    msg = EmailMultiAlternatives(
        subject=subject,
        body=text_content,
        from_email=from_email,
        to=[email],
    )
    msg.attach_alternative(html_content, "text/html")
    msg.send(fail_silently=False)


def send_password_reset_email(email: str, reset_url: str):
    subject = "🔒 Reset password"
    from_email = settings.DEFAULT_FROM_EMAIL

    context = {
        "reset_url": reset_url,
    }

    html_content = render_to_string("password_reset_email.html", context)
    text_content = f"Reset your password:\n{reset_url}"

    msg = EmailMultiAlternatives(
        subject=subject,
        body=text_content,
        from_email=from_email,
        to=[email],
    )
    msg.attach_alternative(html_content, "text/html")
    msg.send(fail_silently=False)


def send_verification_warning_email(user, verify_url: str):
    subject = "🕒 Reminder: Please confirm your email"
    from_email = settings.DEFAULT_FROM_EMAIL

    context = {
        "user": user,
        "verify_url": verify_url,
    }

    html_content = render_to_string("warn_unverified_account.html", context)
    text_content = (
        f"Please confirm your email within 24 hours:\n{verify_url}"
    )

    msg = EmailMultiAlternatives(
        subject=subject,
        body=text_content,
        from_email=from_email,
        to=[user.email],
    )
    msg.attach_alternative(html_content, "text/html")
    msg.send(fail_silently=True)
