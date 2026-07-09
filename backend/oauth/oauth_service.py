from core.models import SocialAccount

from oauth.oauth_factory import OAuthFactory


class OAuthService:

    @staticmethod
    def get_login_url(platform: str):

        provider = OAuthFactory.get_provider(platform)

        return provider.generate_login_url()

    @staticmethod
    def exchange_code(platform: str, code: str):

        provider = OAuthFactory.get_provider(platform)

        return provider.exchange_code(code)

    @staticmethod
    def get_profile(platform: str, access_token: str):

        provider = OAuthFactory.get_provider(platform)

        return provider.get_user_profile(access_token)

    @staticmethod
    def publish(
        platform: str,
        access_token: str,
        text: str,
        image=None,
    ):

        provider = OAuthFactory.get_provider(platform)

        return provider.publish_post(
            access_token=access_token,
            text=text,
            image=image,
        )

    @staticmethod
    def disconnect(platform: str):

        SocialAccount.objects.filter(
            platform=platform,
        ).delete()

        provider = OAuthFactory.get_provider(platform)

        return provider.disconnect()