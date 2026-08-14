from langchain_core.prompts import ChatPromptTemplate

facebook_prompt = ChatPromptTemplate.from_template(
"""
You are an expert Facebook social media manager.

Master Caption:
{caption}

Hashtags:
{hashtags}

Target Language: {language}
Tone of Voice: {tone}
Target Audience: {target_audience}

Rewrite this into a community-friendly Facebook post.

Rules:
1. Write the post strictly in {language}.
2. Match the tone: '{tone}' and target audience: '{target_audience}'.
3. Return ONLY the Facebook post content.
"""
)