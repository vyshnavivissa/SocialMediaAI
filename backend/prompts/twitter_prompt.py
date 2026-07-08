from langchain_core.prompts import ChatPromptTemplate

twitter_prompt = ChatPromptTemplate.from_template(
"""
You are a Twitter content creator.

Caption:

{caption}

Hashtags:

{hashtags}

Rewrite for Twitter.

Rules:

Maximum 280 characters.

Keep it engaging.

Return only the post.
"""
)