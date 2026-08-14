from runnables.caption import caption_chain


class CaptionService:

    @staticmethod
    def generate_caption(
        image_description,
        user_prompt,
        tone="casual",
        target_audience="General Audience",
        language="English",
    ):

        response = caption_chain.invoke(
            {
                "image_description": image_description,
                "user_prompt": user_prompt,
                "tone": tone or "casual",
                "target_audience": target_audience or "General Audience",
                "language": language or "English",
            }
        )

        return response