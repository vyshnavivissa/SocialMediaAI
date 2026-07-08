import requests

from langchain_core.tools import tool


@tool
def linkedin_tool(post: str) -> dict:
    """
    Publish a post to LinkedIn.
    """

    response = requests.post(
        "http://127.0.0.1:8000/mock/linkedin/",
        json={
            "post": post
        },
        timeout=30,
    )

    return response.json()