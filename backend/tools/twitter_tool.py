import requests

from langchain_core.tools import tool


@tool
def twitter_tool(post: str) -> dict:
    """
    Publish a post to Twitter.
    """
    try:
        from core.models import SocialAccount
        from oauth.oauth_service import OAuthService

        account = SocialAccount.objects.filter(
            platform="twitter",
            connected=True
        ).first()

        if account and account.access_token:
            try:
                result = OAuthService.publish(
                    platform="twitter",
                    access_token=account.access_token,
                    text=post
                )
                return {
                    "status": "success",
                    "platform": "twitter",
                    "details": result,
                }
            except Exception as e:
                # If error is unauthorized/expired, try to refresh!
                if "401" in str(e) or "unauthorized" in str(e).lower() or "auth" in str(e).lower():
                    if account.refresh_token:
                        try:
                            from oauth.oauth_factory import OAuthFactory
                            provider = OAuthFactory.get_provider("twitter")
                            refresh_res = provider.refresh_access_token(account.refresh_token)
                            
                            new_access = refresh_res.get("access_token")
                            new_refresh = refresh_res.get("refresh_token")
                            
                            # Save new tokens
                            account.access_token = new_access
                            if new_refresh:
                                account.refresh_token = new_refresh
                            account.save()
                            
                            # Retry posting!
                            result = OAuthService.publish(
                                platform="twitter",
                                access_token=new_access,
                                text=post
                            )
                            return {
                                "status": "success",
                                "platform": "twitter",
                                "details": result,
                            }
                        except Exception as refresh_err:
                            raise Exception(f"Failed to publish after refreshing token: {refresh_err}")
                raise e
    except Exception as e:
        return {
            "status": "failed",
            "reason": str(e),
            "platform": "twitter",
        }

    response = requests.post(
        "http://127.0.0.1:8000/mock/twitter/",
        json={
            "post": post
        },
        timeout=30,
    )

    return response.json()