from django.contrib import admin
from django.urls import path, include, re_path
from allauth.account.views import ConfirmEmailView
from accounts.views import LoginPage, GoogleLogin, GoogleLoginCallback, ProfileView, CustomRegisterView, AllUsersView
from dj_rest_auth.registration.views import VerifyEmailView

from importlib import import_module

# Override the dj_rest_auth.registration.urls, specifically the one with name='rest_register'
# Clone dj_rest_auth.registration.urls.urlpatterns and replace the '' route
custom_registration_urls = list(import_module("dj_rest_auth.registration.urls").urlpatterns)

# Replace the path that has name='rest_register'
for i, urlpattern in enumerate(custom_registration_urls):
    if getattr(urlpattern, 'name', None) == 'rest_register':
        custom_registration_urls[i] = path("", CustomRegisterView.as_view(), name="rest_register")
        break

urlpatterns = [
    path('admin/', admin.site.urls),
    path("login/", LoginPage.as_view(), name="login"),
    path('api/v1/auth/', include('dj_rest_auth.urls')),
    path('comments/', include('comments.urls')),
    path("api/account-confirm-email/", VerifyEmailView.as_view(), name="account_email_verification"),
    re_path(r"^api/v1/auth/accounts/", include("allauth.urls")),
    re_path(
        "^api/v1/auth/registration/account-confirm-email/(?P<key>[-:\w]+)/$",
        ConfirmEmailView.as_view(),
        name="account_confirm_email",
    ),
    path("api/v1/auth/registration/", include((custom_registration_urls, "registration"))),
    path("api/v1/auth/google/", GoogleLogin.as_view(), name="google_login"),
    path("api/v1/auth/profile/", ProfileView.as_view(), name="profile_data"),
    path("api/v1/auth/users/", AllUsersView.as_view(), name="users_data"),
    path(
        "api/v1/auth/google/callback/",
        GoogleLoginCallback.as_view(),
        name="google_login_callback",
    ),
]
