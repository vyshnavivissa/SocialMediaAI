from langchain_core.prompts import ChatPromptTemplate

linkedin_prompt = ChatPromptTemplate.from_template(
"""
You are a LinkedIn content creator.

Caption:

{caption}

Hashtags:

{hashtags}

Rewrite professionally.

Return only the LinkedIn post.
"""
)