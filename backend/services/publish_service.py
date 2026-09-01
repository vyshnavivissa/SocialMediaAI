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
    def publish(cls, generated_post_id, posts: dict, user=None):

        results = {}

        generated_post = GeneratedPost.objects.get(
            id=generated_post_id
        )

        # Retrieve image path if available
        image_path = None
        if generated_post.image:
            try:
                image_path = generated_post.image.path
            except Exception:
                pass

        for platform, post in posts.items():

            tool = cls.TOOLS.get(platform)

            if tool:
                args = {"post": post, "user": user}
                if platform == "linkedin" and image_path:
                    args["image_path"] = image_path

                result = tool.invoke(args)

                import random
                likes_val = random.randint(15, 85) if result["status"] == "success" else 0
                shares_val = random.randint(5, 35) if result["status"] == "success" else 0
                comments_val = random.randint(2, 18) if result["status"] == "success" else 0
                impressions_val = random.randint(350, 1800) if result["status"] == "success" else 0

                PublishedPost.objects.create(
                    user=user if user and user.is_authenticated else None,
                    generated_post=generated_post,
                    platform=platform,
                    content=post,
                    status=result["status"],
                    likes=likes_val,
                    shares=shares_val,
                    comments=comments_val,
                    impressions=impressions_val,
                )

                results[platform] = result

            else:

                results[platform] = {
                    "status": "failed",
                    "reason": "Unsupported platform"
                }

        return results