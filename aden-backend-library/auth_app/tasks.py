from celery import shared_task
from auth_app.api.services.auth.email import send_email_verification, send_password_reset_email
from auth_app.api.sync import delete_inactive_users_sync, warn_inactive_users_sync

@shared_task
def send_verification_email_task(email, first_name):
    send_email_verification(email, first_name)


@shared_task
def cleanup_users_task():
    delete_inactive_users_sync()


@shared_task
def warn_users_task():
    warn_inactive_users_sync()


@shared_task
def send_password_reset_email_task(email, reset_link):
    send_password_reset_email(email, reset_link)
