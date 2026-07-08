from runnables.caption import caption_chain


class CaptionService:

    @staticmethod
    def generate_caption(
        image_description,
        user_prompt,
    ):

        response = caption_chain.invoke(
            {
                "image_description": image_description,
                "user_prompt": user_prompt,
            }
        )

        return response