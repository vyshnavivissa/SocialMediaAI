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
        state = "state_123"
        code_challenge = "6DSe4kY5Kbi9MVzZhqtzCVH8g8_9hqRfFDIKTvMf2Vo"
        return (
            f"{self.AUTH_URL}"
            f"?response_type=code"
            f"&client_id={self.client_id}"
            f"&redirect_uri={self.redirect_uri}"
            f"&scope=tweet.read%20tweet.write%20users.read%20offline.access"
            f"&state={state}"
            f"&code_challenge={code_challenge}"
            f"&code_challenge_method=S256"
        )

    def exchange_code(self, code):
        import requests
        import base64
        credentials = f"{self.client_id}:{self.client_secret}"
        encoded_credentials = base64.b64encode(credentials.encode()).decode()
        
        headers = {
            "Authorization": f"Basic {encoded_credentials}",
            "Content-Type": "application/x-www-form-urlencoded"
        }
        
        payload = {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": self.redirect_uri,
            "code_verifier": "xtest_verifier_string_long_enough_to_meet_entropy_rules_12345"
        }
        
        response = requests.post(self.TOKEN_URL, data=payload, headers=headers)
        if response.status_code != 200:
            raise Exception(f"Failed to retrieve Twitter token: {response.text}")
            
        return response.json()

    def get_user_profile(self, access_token):
        import requests
        headers = {
            "Authorization": f"Bearer {access_token}"
        }
        response = requests.get(self.PROFILE_URL, headers=headers)
        if response.status_code != 200:
            raise Exception(f"Failed to fetch Twitter profile: {response.text}")
        return response.json()

    def publish_post(self, access_token, text, image=None):
        import requests
        url = "https://api.twitter.com/2/tweets"
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }
        payload = {
            "text": text
        }
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code not in (200, 201):
            raise Exception(f"Failed to publish tweet: {response.text}")
        return response.json()

    def disconnect(self):
        return {
            "message": "Twitter Disconnected",
        }

    def refresh_access_token(self, refresh_token):
        import requests
        import base64
        credentials = f"{self.client_id}:{self.client_secret}"
        encoded_credentials = base64.b64encode(credentials.encode()).decode()
        
        headers = {
            "Authorization": f"Basic {encoded_credentials}",
            "Content-Type": "application/x-www-form-urlencoded"
        }
        
        payload = {
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
            "client_id": self.client_id
        }
        
        response = requests.post(self.TOKEN_URL, data=payload, headers=headers)
        if response.status_code != 200:
            raise Exception(f"Failed to refresh Twitter token: {response.text}")
            
        return response.json()