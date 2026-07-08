from langchain_core.prompts import ChatPromptTemplate

caption_prompt = ChatPromptTemplate.from_template(
    """
You are a professional social media content creator.

Image Description:
{image_description}

User Prompt:
{user_prompt}

Generate an engaging social media caption.

Rules:
1. Maximum 100 words.
2. Professional and engaging.
3. Do not generate hashtags.
4. Return only the caption.
"""
)