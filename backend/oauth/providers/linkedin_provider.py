import os

from dotenv import load_dotenv

from .base_provider import BaseOAuthProvider

load_dotenv()


class LinkedInProvider(BaseOAuthProvider):

    AUTH_URL = "https://www.linkedin.com/oauth/v2/authorization"

    TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken"

    PROFILE_URL = "https://api.linkedin.com/v2/userinfo"

    def __init__(self):

        self.client_id = os.getenv("LINKEDIN_CLIENT_ID")

        self.client_secret = os.getenv("LINKEDIN_CLIENT_SECRET")

        self.redirect_uri = os.getenv("LINKEDIN_REDIRECT_URI")

    def generate_login_url(self):

        return (
            f"{self.AUTH_URL}"
            f"?response_type=code"
            f"&client_id={self.client_id}"
            f"&redirect_uri={self.redirect_uri}"
            f"&scope=openid profile email w_member_social"
        )

    def exchange_code(self, code: str):

        return {
            "message": "Exchange authorization code for access token.",
            "code": code,
        }

    def get_user_profile(self, access_token: str):

        return {
            "message": "Fetch LinkedIn user profile.",
            "token": access_token,
        }

    def publish_post(
        self,
        access_token: str,
        text: str,
        image=None,
    ):

        return {
            "message": "Publish LinkedIn Post",
            "text": text,
        }

    def disconnect(self):

        return {
            "message": "LinkedIn account disconnected."
        }