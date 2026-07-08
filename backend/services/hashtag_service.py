from runnables.hashtags import hashtag_chain


class HashtagService:

    @staticmethod
    def generate_hashtags(caption):
        hashtags = hashtag_chain.invoke(
            {
                "caption": caption
                }
                )
        hashtags = [
            tag.strip()
            for tag in hashtags.splitlines()
            if tag.strip()
            ]
        return hashtags