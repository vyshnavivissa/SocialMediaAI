from services.image_service import ImageService
from services.caption_service import CaptionService
from services.hashtag_service import HashtagService
from services.platform_service import PlatformService
from core.models import GeneratedPost

class SocialMediaService:

    @staticmethod
    def generate(image, prompt, platforms):

        # Save image (if uploaded)
        image_path = None

        if image:
            image_path = ImageService.save_image(image)

        # Temporary (later replaced by Vision model)
        image_description = "A person presenting an AI chatbot."

        # Generate master caption
        caption = CaptionService.generate_caption(
            image_description=image_description,
            user_prompt=prompt,
        )

        # Generate hashtags
        hashtags = HashtagService.generate_hashtags(caption)

        # Generate posts only for selected platforms
        platform_posts = PlatformService.generate_posts(
            caption=caption,
            hashtags=hashtags,
            platforms=platforms,
        )

        generated_post = GeneratedPost.objects.create(
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