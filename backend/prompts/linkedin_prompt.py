from langchain_core.prompts import ChatPromptTemplate

linkedin_prompt = ChatPromptTemplate.from_template(
"""
You are an expert LinkedIn copywriter.

Master Caption:
{caption}

Hashtags:
{hashtags}

Target Language: {language}
Tone of Voice: {tone}
Target Audience: {target_audience}

Rewrite this into a high-converting LinkedIn post.

Rules:
1. Write the post strictly in {language}.
2. Adapt to the tone: '{tone}' and target audience: '{target_audience}'.
3. Use professional formatting with bullet points or spacing if helpful.
4. Return ONLY the final LinkedIn post.
"""
)