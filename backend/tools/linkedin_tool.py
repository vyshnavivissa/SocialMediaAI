import requests

from langchain_core.tools import tool


@tool
def linkedin_tool(post: str, image_path: str = None) -> dict:
    """
    Publish a post to LinkedIn.
    """
    try:
        from core.models import SocialAccount
        from oauth.oauth_service import OAuthService

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