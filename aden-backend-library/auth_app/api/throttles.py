# throttles.py
from rest_framework.throttling import UserRateThrottle

class LoginThrottle(UserRateThrottle):
    scope = 'login'

class GoogleLoginThrottle(UserRateThrottle):
    scope = 'google_login'

class GoogleReAuthThrottle(UserRateThrottle):
    scope = 'google_reauth'

class DeleteAccountThrottle(UserRateThrottle):
    scope = 'delete_account'

class ReAuthThrottle(UserRateThrottle):
    scope = 'reauth'

class ChangeEmailThrottle(UserRateThrottle):
    scope = 'change_email'

class PasswordResetRequestThrottle(UserRateThrottle):
    scope = 'password_reset_request'

class PasswordResetConfirmThrottle(UserRateThrottle):
    scope = 'password_reset_confirm'

class RegisterThrottle(UserRateThrottle):
    scope = 'register'

class VerifyEmailThrottle(UserRateThrottle):
    scope = 'verify_email'

class ResendVerifyEmailThrottle(UserRateThrottle):
    scope = 'resend_verify_email'
