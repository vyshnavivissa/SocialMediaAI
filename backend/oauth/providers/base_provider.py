from abc import ABC, abstractmethod


class BaseOAuthProvider(ABC):

    @abstractmethod
    def generate_login_url(self):
        """
        Generate the OAuth login URL.
        """
        pass

    @abstractmethod
    def exchange_code(self, code: str):
        """
        Exchange the authorization code for an access token.
        """
        pass

    @abstractmethod
    def get_user_profile(self, access_token: str):
        """
        Fetch the user's profile information.
        """
        pass

    @abstractmethod
    def publish_post(
        self,
        access_token: str,
        text: str,
        image=None,
    ):
        """
        Publish a post to the social platform.
        """
        pass

    @abstractmethod
    def disconnect(self):
        """
        Disconnect the social account.
        """
        pass