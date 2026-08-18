import requests

from langchain_core.tools import tool


@tool
def linkedin_tool(post: str, image_path: str = None, user=None) -> dict:
    """
    Publish a post to LinkedIn for the authenticated user.
    """
    try:
        from core.models import SocialAccount
        from oauth.oauth_service import OAuthService

        account = None
        if user and user.is_authenticated:
            account = SocialAccount.objects.filter(
                user=user,
                platform="linkedin",
                connected=True
            ).first()

        # Fallback if user is not passed or for local single-tenant testing
        if not account:
            account = SocialAccount.objects.filter(
                platform="linkedin",
                connected=True
            ).first()

        if account and account.access_token:
            result = OAuthService.publish(
                platform="linkedin",
                access_token=account.access_token,
                text=post,
                image=image_path,
            )
            return {
                "status": "success",
                "platform": "linkedin",
                "details": result,
            }
        else:
            return {
                "status": "failed",
                "reason": "No connected LinkedIn account found for this user. Please connect LinkedIn in Settings.",
                "platform": "linkedin",
            }
    except Exception as e:
        return {
            "status": "failed",
            "reason": str(e),
            "platform": "linkedin",
        }

    response = requests.post(
        "http://127.0.0.1:8000/mock/linkedin/",
        json={
            "post": post
        },
        timeout=30,
    )

    return response.json()