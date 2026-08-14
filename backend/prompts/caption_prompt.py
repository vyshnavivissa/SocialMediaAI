from langchain_core.prompts import ChatPromptTemplate

caption_prompt = ChatPromptTemplate.from_template(
    """
You are a professional social media content creator.

Image Description:
{image_description}

User Prompt:
{user_prompt}

Tone: {tone}
Target Audience: {target_audience}
Language: {language}

Generate an engaging social media caption adhering strictly to the specified Tone, Target Audience, and Language.

Rules:
1. Maximum 100 words.
2. Match the specified tone ({tone}) and target audience ({target_audience}).
3. Write the response in {language}.
4. Do not generate hashtags.
5. Return only the caption text.
"""
)