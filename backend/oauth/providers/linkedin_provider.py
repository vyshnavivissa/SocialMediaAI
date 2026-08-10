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
            f"&scope=openid profile email w_member_social w_organization_social"
        )

    def exchange_code(self, code: str):
        import requests
        payload = {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": self.redirect_uri,
            "client_id": self.client_id,
            "client_secret": self.client_secret,
        }
        headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        response = requests.post(self.TOKEN_URL, data=payload, headers=headers)
        if response.status_code != 200:
            raise Exception(f"Failed to retrieve access token: {response.text}")
        return response.json()

    def get_user_profile(self, access_token: str):
        import requests
        headers = {
            "Authorization": f"Bearer {access_token}"
        }
        response = requests.get(self.PROFILE_URL, headers=headers)
        if response.status_code != 200:
            raise Exception(f"Failed to retrieve user profile: {response.text}")
        return response.json()

    def publish_post(
        self,
        access_token: str,
        text: str,
        image=None,
    ):
        import requests

        # Determine if we should post to an organization or personal profile
        org_id = os.getenv("LINKEDIN_ORGANIZATION_ID")
        if org_id:
            author_urn = f"urn:li:organization:{org_id}"
        else:
            profile = self.get_user_profile(access_token)
            person_id = profile.get("sub")
            if not person_id:
                raise Exception("Could not retrieve LinkedIn person ID.")
            author_urn = f"urn:li:person:{person_id}"

        url = "https://api.linkedin.com/v2/ugcPosts"
        headers = {
            "Authorization": f"Bearer {access_token}",
            "X-Restli-Protocol-Version": "2.0.0",
            "Content-Type": "application/json",
        }
        payload = {
            "author": author_urn,
            "lifecycleState": "PUBLISHED",
            "specificContent": {
                "com.linkedin.ugc.ShareContent": {
                    "shareCommentary": {
                        "text": text
                    },
                    "shareMediaCategory": "NONE"
                }
            },
            "visibility": {
                "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
            }
        }
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code not in (200, 201):
            raise Exception(f"Failed to publish post to LinkedIn: {response.text}")
        return response.json()

    def disconnect(self):
        return {
            "message": "LinkedIn account disconnected."
        }