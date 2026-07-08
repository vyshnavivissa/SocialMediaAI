from tools.twitter_tool import twitter_tool
from tools.instagram_tool import instagram_tool
from tools.linkedin_tool import linkedin_tool
from tools.facebook_tool import facebook_tool

from core.models import GeneratedPost, PublishedPost


class PublishService:

    TOOLS = {
        "twitter": twitter_tool,
        "instagram": instagram_tool,
        "linkedin": linkedin_tool,
        "facebook": facebook_tool,
    }

    @classmethod
    def publish(cls, generated_post_id, posts: dict):

        results = {}

        generated_post = GeneratedPost.objects.get(
            id=generated_post_id
        )

        for platform, post in posts.items():

            tool = cls.TOOLS.get(platform)

            if tool:

                result = tool.invoke(
                    {
                        "post": post
                    }
                )

                PublishedPost.objects.create(
                    generated_post=generated_post,
                    platform=platform,
                    content=post,
                    status=result["status"],
                )

                results[platform] = result

            else:

                results[platform] = {
                    "status": "failed",
                    "reason": "Unsupported platform"
                }

        return results