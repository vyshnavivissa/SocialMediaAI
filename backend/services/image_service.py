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
            prompt_lower = prompt.lower()
            human_keywords = ["human", "person", "man", "woman", "girl", "boy", "face", "portrait", "model", "people", "team", "avatar", "character"]
            requests_human = any(keyword in prompt_lower for keyword in human_keywords)

            if requests_human:
                enhanced_prompt = f"Professional high quality photorealistic social media image of {prompt[:150]}, studio lighting, 8k resolution"
            else:
                enhanced_prompt = f"Modern graphic design layout, futuristic tech illustration, 3D abstract digital artwork, visual concept banner, vibrant gradient, clean composition: {prompt[:150]}, no face, no human portrait"

            encoded_prompt = urllib.parse.quote(enhanced_prompt)
            image_url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width=1024&height=1024&nologo=true&seed={uuid.uuid4().int % 100000}"
            
            response = requests.get(image_url, timeout=20)
            if response.status_code == 200:
                filename = f"ai_gen_{uuid.uuid4().hex[:8]}.jpg"
                content_file = ContentFile(response.content, name=filename)
                saved_path = default_storage.save(f"generated_posts/{filename}", content_file)
                return saved_path, content_file
        except Exception as e:
            print(f"AI image generation failed: {e}")
        return None, None