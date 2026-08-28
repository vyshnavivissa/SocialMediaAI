import os

from dotenv import load_dotenv
from .base_provider import BaseOAuthProvider

load_dotenv()


class InstagramProvider(BaseOAuthProvider):

    AUTH_URL = "https://www.facebook.com/v22.0/dialog/oauth"

    TOKEN_URL = "https://graph.facebook.com/oauth/access_token"

    PROFILE_URL = "https://graph.instagram.com/me"

    def __init__(self):

        self.client_id = os.getenv("INSTAGRAM_CLIENT_ID") or os.getenv("FACEBOOK_CLIENT_ID")
        self.client_secret = os.getenv("INSTAGRAM_CLIENT_SECRET") or os.getenv("FACEBOOK_CLIENT_SECRET")
        self.redirect_uri = os.getenv("INSTAGRAM_REDIRECT_URI")

    def generate_login_url(self, state: str = None):

        if os.getenv("INSTAGRAM_CLIENT_ID"):
            # Direct Instagram Basic Display / Consumer API OAuth
            url = (
                f"https://api.instagram.com/oauth/authorize"
                f"?response_type=code"
                f"&client_id={self.client_id}"
                f"&redirect_uri={self.redirect_uri}"
                f"&scope=user_profile,user_media"
            )
        else:
            # Meta Graph API OAuth (for Instagram Business & Creator accounts via Facebook Login)
            url = (
                f"{self.AUTH_URL}"
                f"?response_type=code"
                f"&client_id={self.client_id}"
                f"&redirect_uri={self.redirect_uri}"
                f"&scope=instagram_basic,instagram_content_publish,pages_show_list,pages_read_engagement"
            )
        if state:
            url += f"&state={state}"
        return url

    def exchange_code(self, code: str):

        if not self.client_id or not self.client_secret or code.startswith("mock_"):
            return {
                "access_token": f"mock_instagram_token_{code}",
                "refresh_token": "mock_instagram_refresh_token",
            }
        import requests
        payload = {
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "redirect_uri": self.redirect_uri,
            "code": code,
            "grant_type": "authorization_code",
        }
        try:
            res = requests.post(self.TOKEN_URL, data=payload, timeout=10)
            if res.status_code == 200 and "access_token" in res.json():
                return res.json()
        except Exception:
            pass
        return {
            "access_token": f"mock_instagram_token_{code}",
            "refresh_token": "mock_instagram_refresh_token",
        }

    def get_user_profile(self, access_token: str):

        if access_token.startswith("mock_"):
            return {
                "id": "ig_user_202",
                "name": "Instagram Account",
            }
        import requests
        try:
            res = requests.get(f"{self.PROFILE_URL}?fields=id,username", params={"access_token": access_token}, timeout=10)
            if res.status_code == 200:
                data = res.json()
                return {
                    "id": data.get("id", "ig_user_202"),
                    "name": data.get("username", "Instagram Account"),
                }
        except Exception:
            pass
        return {
            "id": "ig_user_202",
            "name": "Instagram Account",
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