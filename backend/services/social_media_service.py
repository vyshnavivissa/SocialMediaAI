from services.image_service import ImageService
from core.models import GeneratedPost
from agents import run_social_media_agent_workflow

class SocialMediaService:

    @staticmethod
    def generate(image, prompt, platforms, user=None):

        # Save image (if uploaded)
        image_path = None

        if image:
            image_path = ImageService.save_image(image)

        # Execute Autonomous Multi-Agent Workflow (LangGraph)
        agent_result = run_social_media_agent_workflow(
            prompt=prompt,
            platforms=platforms,
            image_path=image_path,
        )

        caption = agent_result.get("master_caption", "")
        hashtags = agent_result.get("hashtags", [])
        platform_posts = agent_result.get("generated_posts", {})

        generated_post = GeneratedPost.objects.create(
            user=user if user and user.is_authenticated else None,
            image=image,
            prompt=prompt,
            master_caption=caption,
            hashtags=hashtags,
            generated_posts=platform_posts,
        )
        return {
            "id": generated_post.id,
            "image_path": image_path,
            "master_caption": caption,
            "hashtags": hashtags,
            "generated_posts": platform_posts,
        }