import os
import uuid
import re
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
        """Automatically generate an AI image with strict non-human graphic design rules."""
        try:
            prompt_lower = prompt.lower()
            human_keywords = [
                "human", "person", "man", "woman", "girl", "boy", "face", 
                "portrait", "model", "people", "team", "avatar", "character", "worker"
            ]
            requests_human = any(keyword in prompt_lower for keyword in human_keywords)

            if requests_human:
                strict_prompt = (
                    f"Professional high quality photorealistic social media photo showing {prompt[:160]}, "
                    f"studio lighting, sharp focus, 8k resolution"
                )
            else:
                strict_prompt = (
                    f"Abstract 3D vector graphic design, modern tech marketing poster, "
                    f"vibrant color gradient background, glossy glassmorphism elements, "
                    f"isometric infographic artwork, clean layout composition. "
                    f"Visual Concept: {prompt[:160]}. "
                    f"STRICT DIRECTIVE: Absolutely no human face, no person, no woman, no man, no android head, no biological body."
                )

            # Check if OpenRouter key is configured
            openrouter_key = os.getenv("OPENROUTER_API_KEY")
            if openrouter_key:
                try:
                    headers = {
                        "Authorization": f"Bearer {openrouter_key}",
                        "Content-Type": "application/json",
                        "HTTP-Referer": "http://localhost:8000",
                        "X-Title": "SocialMediaAI"
                    }
                    payload = {
                        "model": "google/imagen-3",
                        "messages": [{"role": "user", "content": strict_prompt}],
                        "modalities": ["image"]
                    }
                    response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload, timeout=35)
                    if response.status_code == 200:
                        data = response.json()
                        choices = data.get("choices", [])
                        if choices:
                            msg = choices[0].get("message", {})
                            image_url = None
                            if "images" in msg and msg["images"]:
                                image_url = msg["images"][0]
                            elif isinstance(msg.get("content"), str):
                                match = re.search(r'https?://[^\s\)]+', msg["content"])
                                if match:
                                    image_url = match.group(0)

                            if image_url:
                                img_resp = requests.get(image_url, timeout=25)
                                if img_resp.status_code == 200:
                                    filename = f"imagen3_{uuid.uuid4().hex[:8]}.jpg"
                                    content_file = ContentFile(img_resp.content, name=filename)
                                    saved_path = default_storage.save(f"generated_posts/{filename}", content_file)
                                    return saved_path, content_file
                except Exception as er:
                    print(f"OpenRouter google/imagen-3 failed: {er}")

            # Direct Pollinations generator with strict seed & prompt
            encoded_prompt = urllib.parse.quote(strict_prompt)
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