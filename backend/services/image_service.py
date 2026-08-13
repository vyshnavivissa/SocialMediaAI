import uuid
import urllib.parse
import requests
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage


class ImageService:

    @staticmethod
    def save_image(image):
        file_path = default_storage.save(image.name, image)
        return file_path

    @staticmethod
    def generate_ai_image(prompt):
        """Automatically generate an AI image based on user prompt if no image uploaded."""
        try:
            enhanced_prompt = f"Professional social media graphic, modern digital illustration, high quality: {prompt[:150]}"
            encoded_prompt = urllib.parse.quote(enhanced_prompt)
            image_url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width=1024&height=1024&nologo=true"
            
            response = requests.get(image_url, timeout=20)
            if response.status_code == 200:
                filename = f"ai_gen_{uuid.uuid4().hex[:8]}.jpg"
                content_file = ContentFile(response.content, name=filename)
                saved_path = default_storage.save(f"generated_posts/{filename}", content_file)
                return saved_path, content_file
        except Exception as e:
            print(f"AI image generation failed: {e}")
        return None, None