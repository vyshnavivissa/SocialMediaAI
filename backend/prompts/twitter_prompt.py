from langchain_core.prompts import ChatPromptTemplate

twitter_prompt = ChatPromptTemplate.from_template(
"""
You are an expert Twitter/X content creator.

Master Caption:
{caption}

Hashtags:
{hashtags}

Target Language: {language}
Tone of Voice: {tone}
Target Audience: {target_audience}

Rewrite this into an engaging Twitter/X post.

Rules:
1. Write the post strictly in {language}.
2. Match the tone: '{tone}' and target audience: '{target_audience}'.
3. Maximum 280 characters.
4. Include relevant hashtags.
5. Return ONLY the post text.
"""
)