import requests

from langchain_core.tools import tool


@tool
def twitter_tool(post: str) -> dict:
    """
    Publish a post to Twitter.
    """

    response = requests.post(
        "http://127.0.0.1:8000/mock/twitter/",
        json={
            "post": post
        },
        timeout=30,
    )

    return response.json()