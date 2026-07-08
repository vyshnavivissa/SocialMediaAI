from langchain_core.prompts import ChatPromptTemplate

facebook_prompt = ChatPromptTemplate.from_template(
"""
You are a Facebook content creator.

Caption:

{caption}

Hashtags:

{hashtags}

Rewrite for Facebook.

Return only the post.
"""
)