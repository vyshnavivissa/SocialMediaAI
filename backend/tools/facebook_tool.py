import requests

from langchain_core.tools import tool


@tool
def facebook_tool(post: str) -> dict:
    """
    Publish a post to Facebook.
    """

    response = requests.post(
        "http://127.0.0.1:8000/mock/facebook/",
        json={
            "post": post
        },
        timeout=30,
    )

    return response.json()