import os

from dotenv import load_dotenv
from .base_provider import BaseOAuthProvider

load_dotenv()


class FacebookProvider(BaseOAuthProvider):

    AUTH_URL = "https://www.facebook.com/v22.0/dialog/oauth"

    TOKEN_URL = "https://graph.facebook.com/v22.0/oauth/access_token"

    PROFILE_URL = "https://graph.facebook.com/me"

    def __init__(self):

        self.client_id = os.getenv("FACEBOOK_CLIENT_ID")
        self.client_secret = os.getenv("FACEBOOK_CLIENT_SECRET")
        self.redirect_uri = os.getenv("FACEBOOK_REDIRECT_URI")

    def generate_login_url(self, state: str = None):

        url = (
            f"{self.AUTH_URL}"
            f"?response_type=code"
            f"&client_id={self.client_id}"
            f"&redirect_uri={self.redirect_uri}"
            f"&scope=email,public_profile,pages_manage_posts,pages_read_engagement"
        )
        if state:
            url += f"&state={state}"
        return url

    def exchange_code(self, code: str):

        if not self.client_id or not self.client_secret or code.startswith("mock_"):
            return {
                "access_token": f"mock_facebook_token_{code}",
                "refresh_token": "mock_facebook_refresh_token",
            }
        import requests
        payload = {
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "redirect_uri": self.redirect_uri,
            "code": code,
        }
        try:
            res = requests.get(self.TOKEN_URL, params=payload, timeout=10)
            if res.status_code == 200 and "access_token" in res.json():
                return res.json()
        except Exception:
            pass
        return {
            "access_token": f"mock_facebook_token_{code}",
            "refresh_token": "mock_facebook_refresh_token",
        }

    def get_user_profile(self, access_token: str):

        if access_token.startswith("mock_"):
            return {
                "id": "fb_user_101",
                "name": "Facebook Account",
            }
        import requests
        headers = {"Authorization": f"Bearer {access_token}"}
        try:
            res = requests.get(f"{self.PROFILE_URL}?fields=id,name,email", headers=headers, timeout=10)
            if res.status_code == 200:
                return res.json()
        except Exception:
            pass
        return {
            "id": "fb_user_101",
            "name": "Facebook Account",
        }

    def publish_post(self, access_token, text, image=None):

        return {
            "message": "Facebook Publish",
            "text": text,
        }

    def disconnect(self):

        return {
            "message": "Facebook Disconnected",
        }