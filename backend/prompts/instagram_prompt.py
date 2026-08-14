from langchain_core.prompts import ChatPromptTemplate

instagram_prompt = ChatPromptTemplate.from_template(
"""
You are an expert Instagram content creator.

Master Caption:
{caption}

Hashtags:
{hashtags}

Target Language: {language}
Tone of Voice: {tone}
Target Audience: {target_audience}

Rewrite this into an engaging visual Instagram caption.

Rules:
1. Write the post strictly in {language}.
2. Match the tone: '{tone}' and target audience: '{target_audience}'.
3. Include emojis and well-spaced paragraphs.
4. Append hashtags nicely at the bottom.
5. Return ONLY the caption text.
"""
)