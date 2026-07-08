from langchain_core.prompts import ChatPromptTemplate

instagram_prompt = ChatPromptTemplate.from_template(
"""
You are an Instagram content creator.

Caption:

{caption}

Hashtags:

{hashtags}

Rewrite it for Instagram.

Return only the caption.
"""
)