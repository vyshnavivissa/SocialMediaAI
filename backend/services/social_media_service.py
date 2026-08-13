from services.image_service import ImageService
from core.models import GeneratedPost
from agents import run_social_media_agent_workflow

class SocialMediaService:

    @staticmethod
    def generate(image, prompt, platforms, user=None):

        # Handle Image Asset (User Uploaded OR Auto AI Generated)
        image_path = None
        saved_image_field = None

        if image:
            image_path = ImageService.save_image(image)
            saved_image_field = image
        else:
            # Automatically generate AI image based on user prompt if no upload
            image_path, saved_image_field = ImageService.generate_ai_image(prompt)

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
            image=saved_image_field,
            prompt=prompt,
            master_caption=caption,
            hashtags=hashtags,
            generated_posts=platform_posts,
        )

        final_image_url = generated_post.image.url if generated_post.image else image_path

        return {
            "id": generated_post.id,
            "image_path": final_image_url,
            "master_caption": caption,
            "hashtags": hashtags,
            "generated_posts": platform_posts,
        }