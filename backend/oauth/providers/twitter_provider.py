import os

from dotenv import load_dotenv
from .base_provider import BaseOAuthProvider

load_dotenv()


class TwitterProvider(BaseOAuthProvider):

    AUTH_URL = "https://twitter.com/i/oauth2/authorize"

    TOKEN_URL = "https://api.twitter.com/2/oauth2/token"

    PROFILE_URL = "https://api.twitter.com/2/users/me"

    def __init__(self):

        self.client_id = os.getenv("TWITTER_CLIENT_ID")
        self.client_secret = os.getenv("TWITTER_CLIENT_SECRET")
        self.redirect_uri = os.getenv("TWITTER_REDIRECT_URI")

    def generate_login_url(self):

        return (
            f"{self.AUTH_URL}"
            f"?response_type=code"
            f"&client_id={self.client_id}"
            f"&redirect_uri={self.redirect_uri}"
            f"&scope=tweet.read tweet.write users.read offline.access"
        )

    def exchange_code(self, code):

        return {
            "message": "Exchange Twitter Code",
            "code": code,
        }

    def get_user_profile(self, access_token):

        return {
            "message": "Twitter Profile",
        }

    def publish_post(self, access_token, text, image=None):

        return {
            "message": "Publish Tweet",
            "text": text,
        }

    def disconnect(self):

        return {
            "message": "Twitter Disconnected",
        }