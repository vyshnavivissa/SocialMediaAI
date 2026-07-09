import os

from dotenv import load_dotenv
from .base_provider import BaseOAuthProvider

load_dotenv()


class InstagramProvider(BaseOAuthProvider):

    AUTH_URL = "https://www.facebook.com/v22.0/dialog/oauth"

    TOKEN_URL = "https://graph.facebook.com/oauth/access_token"

    PROFILE_URL = "https://graph.instagram.com/me"

    def __init__(self):

        self.client_id = os.getenv("INSTAGRAM_CLIENT_ID")
        self.client_secret = os.getenv("INSTAGRAM_CLIENT_SECRET")
        self.redirect_uri = os.getenv("INSTAGRAM_REDIRECT_URI")

    def generate_login_url(self):

        return (
            f"{self.AUTH_URL}"
            f"?client_id={self.client_id}"
            f"&redirect_uri={self.redirect_uri}"
        )

    def exchange_code(self, code):

        return {
            "message": "Instagram Token",
            "code": code,
        }

    def get_user_profile(self, access_token):

        return {
            "message": "Instagram Profile",
        }

    def publish_post(self, access_token, text, image=None):

        return {
            "message": "Instagram Publish",
            "text": text,
        }

    def disconnect(self):

        return {
            "message": "Instagram Disconnected",
        }