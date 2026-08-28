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

    def generate_login_url(self, state: str = None):

        url = (
            f"{self.AUTH_URL}"
            f"?response_type=code"
            f"&client_id={self.client_id}"
            f"&redirect_uri={self.redirect_uri}"
            f"&scope=openid profile email w_member_social"
        )
        if state:
            url += f"&state={state}"
        return url

    def exchange_code(self, code: str):

        if not self.client_id or not self.client_secret or code.startswith("mock_"):
            return {
                "access_token": f"mock_linkedin_token_{code}",
                "refresh_token": "mock_linkedin_refresh_token",
            }

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
        try:
            response = requests.post(self.TOKEN_URL, data=payload, headers=headers, timeout=10)
            if response.status_code == 200:
                return response.json()
        except Exception:
            pass

        return {
            "access_token": f"mock_linkedin_token_{code}",
            "refresh_token": "mock_linkedin_refresh_token",
        }

    def get_user_profile(self, access_token: str):

        if access_token.startswith("mock_"):
            return {
                "sub": "li_user_404",
                "name": "LinkedIn User",
            }

        import requests
        headers = {
            "Authorization": f"Bearer {access_token}"
        }
        try:
            response = requests.get(self.PROFILE_URL, headers=headers, timeout=10)
            if response.status_code == 200:
                return response.json()
        except Exception:
            pass

        return {
            "sub": "li_user_404",
            "name": "LinkedIn User",
        }

    def publish_post(
        self,
        access_token: str,
        text: str,
        image: str = None,
    ):
        import requests
        import os

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

        # API Versioning Header is required for rest/posts and rest/images
        api_version = "202607"
        media_id = None

        # Upload image using the new rest/images API if present
        if image and os.path.exists(image):
            try:
                # Step 1: Initialize Upload
                init_url = "https://api.linkedin.com/rest/images?action=initializeUpload"
                init_headers = {
                    "Authorization": f"Bearer {access_token}",
                    "LinkedIn-Version": api_version,
                    "Content-Type": "application/json",
                }
                init_payload = {
                    "initializeUploadRequest": {
                        "owner": author_urn
                    }
                }
                init_resp = requests.post(init_url, json=init_payload, headers=init_headers)
                if init_resp.status_code == 200:
                    init_data = init_resp.json()
                    upload_url = init_data["value"]["uploadUrl"]
                    media_id = init_data["value"]["image"]

                    # Step 2: Upload Binary
                    with open(image, "rb") as f:
                        upload_headers = {
                            "Authorization": f"Bearer {access_token}"
                        }
                        upload_resp = requests.put(upload_url, data=f, headers=upload_headers)
            except Exception:
                # Fall back to text only if upload fails
                media_id = None

        # Step 3: Create Post using the rest/posts endpoint
        posts_url = "https://api.linkedin.com/rest/posts"
        posts_headers = {
            "Authorization": f"Bearer {access_token}",
            "LinkedIn-Version": api_version,
            "X-Restli-Protocol-Version": "2.0.0",
            "Content-Type": "application/json",
        }
        
        payload = {
            "author": author_urn,
            "commentary": text,
            "visibility": "PUBLIC",
            "distribution": {
                "feedDistribution": "MAIN_FEED"
            },
            "lifecycleState": "PUBLISHED"
        }

        if media_id:
            payload["content"] = {
                "media": {
                    "title": "Uploaded Image",
                    "id": media_id
                }
            }

        response = requests.post(posts_url, json=payload, headers=posts_headers)
        if response.status_code not in (200, 201):
            raise Exception(f"Failed to publish post to LinkedIn: {response.text}")
            
        if not response.text.strip():
            return {
                "message": "Post created successfully",
                "id": response.headers.get("x-linkedin-id") or response.headers.get("Location")
            }
        return response.json()

    def disconnect(self):
        return {
            "message": "LinkedIn account disconnected."
        }