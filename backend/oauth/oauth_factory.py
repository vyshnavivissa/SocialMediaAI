from oauth.providers.linkedin_provider import LinkedInProvider
from oauth.providers.twitter_provider import TwitterProvider
from oauth.providers.facebook_provider import FacebookProvider
from oauth.providers.instagram_provider import InstagramProvider


class OAuthFactory:

    PROVIDERS = {
        "linkedin": LinkedInProvider,
        "twitter": TwitterProvider,
        "facebook": FacebookProvider,
        "instagram": InstagramProvider,
    }

    @classmethod
    def get_provider(cls, platform: str):

        provider = cls.PROVIDERS.get(platform.lower())

        if not provider:
            raise ValueError(
                f"{platform} provider is not supported."
            )

        return provider()