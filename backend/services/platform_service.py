from langchain_core.runnables import RunnableParallel

from runnables.platform import (
    twitter_chain,
    instagram_chain,
    linkedin_chain,
    facebook_chain,
)


class PlatformService:

    @staticmethod
    def generate_posts(caption, hashtags, platforms, tone="casual", target_audience="General Audience", language="English"):

        available = {
            "twitter": twitter_chain,
            "instagram": instagram_chain,
            "linkedin": linkedin_chain,
            "facebook": facebook_chain,
        }

        selected = {
            platform: available[platform]
            for platform in platforms
            if platform in available
        }

        chain = RunnableParallel(**selected)

        hashtag_string = " ".join(hashtags)

        return chain.invoke(
            {
                "caption": caption,
                "hashtags": hashtag_string,
                "tone": tone or "casual",
                "target_audience": target_audience or "General Audience",
                "language": language or "English",
            }
        )