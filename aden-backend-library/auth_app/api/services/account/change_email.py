from django.db import IntegrityError, transaction
import logging

logger = logging.getLogger(__name__)


def change_user_email(user, new_email):
    """
    Attempts to change the user's email address.
    - Sets the user to inactive so they must confirm via new link.
    - If the email already exists → returns False.

    Returns:
        True   → Email changed
        False  → Email already exists
    """

    if user.email.lower() == new_email.lower():
        return True

    try:
        with transaction.atomic():
            user.email = new_email.lower().strip()
            user.is_active = False  # Must be confirmed again
            user.save(update_fields=["email", "is_active"])
        return True

    except IntegrityError:
        logger.warning(f"❌ Email change failed: {new_email} already exists.")
        return False

