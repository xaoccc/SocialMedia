from django.contrib import admin
from django.urls import path, include, re_path
from allauth.account.views import ConfirmEmailView
from accounts.views import LoginPage, GoogleLogin, GoogleLoginCallback

urlpatterns = [
    path('admin/', admin.site.urls),
    path("login/", LoginPage.as_view(), name="login"),
    path('api/v1/auth/', include('dj_rest_auth.urls')),
    re_path(r"^api/v1/auth/accounts/", include("allauth.urls")),
    re_path(
        "^api/v1/auth/registration/account-confirm-email/(?P<key>[-:\w]+)/$",
        ConfirmEmailView.as_view(),
        name="account_confirm_email",
    ),
    path("api/v1/auth/registration/", include("dj_rest_auth.registration.urls")),
    path("api/v1/auth/google/", GoogleLogin.as_view(), name="google_login"),
    path(
        "api/v1/auth/google/callback/",
        GoogleLoginCallback.as_view(),
        name="google_login_callback",
    ),
]
