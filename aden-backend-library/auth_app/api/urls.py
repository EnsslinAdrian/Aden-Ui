from django.urls import path
from auth_app.api.views.login import CustomLoginView, LogoutView, RefreshAccessTokenView, AuthStatusView
from auth_app.api.views.register import RegisterView, VerifyEmailView, ResendVerificationEmailView
from auth_app.api.views.password_reset import PasswordResetRequestView, PasswordResetConfirmView
from auth_app.api.views.google_auth import GoogleLoginView, GoogleReAuthView
from auth_app.api.views.account import ChangeEmailView, DeleteAccountView, ReAuthenticateView, UpgradeAccountView
from auth_app.api.views.profile import UserProfileView, UserListView, MemberProfileView
from .views.webhook import lemonsqueezy_webhook


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('verify-email/', VerifyEmailView.as_view(), name='verify_email'),
    path('resend-verification-email/', ResendVerificationEmailView.as_view(), name='resend_verification_email'),

    path('login/', CustomLoginView.as_view(), name='token_obtain_pair'),
    path('status/', AuthStatusView.as_view(), name='auth_status'),
    path('refresh/', RefreshAccessTokenView.as_view(), name='token_refresh'),

    path('social/google/', GoogleLoginView.as_view()),

    path('password-reset/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('password-confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    path('delete-account/', DeleteAccountView.as_view(), name='delete_account'),
    path('re-authenticate/', ReAuthenticateView.as_view(), name='re_authenticate'),
    path('re-authenticate/google/', GoogleReAuthView.as_view(), name='google_reauth'),
    path('upgrade-account/', UpgradeAccountView.as_view(), name='upgrade-account'),

    path('logout/', LogoutView.as_view(), name='logout'),

    path('change-email/', ChangeEmailView.as_view(), name='change_email'),

    path('user-profile/', UserProfileView.as_view(), name='user-profile'),
    path('members/<str:username>/', MemberProfileView.as_view(), name='member-profile'),
    
    path('webhooks/lemonsqueezy/', lemonsqueezy_webhook, name='lemonsqueezy-webhook'),
]
