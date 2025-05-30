from allauth.account.adapter import DefaultAccountAdapter
from django.core.mail import EmailMessage
from allauth.account.models import EmailAddress


class MyAccountAdapter(DefaultAccountAdapter):
    def get_email_confirmation_url(self, request, emailconfirmation):
        return f"http://localhost:5173/confirm-email/{emailconfirmation.key}"

    def send_confirmation_mail(self, request, emailconfirmation, signup):

        activate_url = self.get_email_confirmation_url(request, emailconfirmation)
        msg = f"""
            Hello from Social Media!

            You're receiving this email because user {emailconfirmation.email_address.user.username} has given your email address to register an account on example.com.

            To confirm this is correct, click here {activate_url} and log in.

            Thank you for using Social Media!
            socialmedia.com
            """
        email = EmailMessage(
            "Please Confirm Your Email Address",
            msg,
            to=[emailconfirmation.email_address.email],
        )
        email.send()