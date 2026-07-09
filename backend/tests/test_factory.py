from oauth.oauth_factory import OAuthFactory

provider = OAuthFactory.get_provider("linkedin")

print(provider.generate_login_url())