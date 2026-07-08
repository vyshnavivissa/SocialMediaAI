from langchain_core.prompts import ChatPromptTemplate

hashtag_prompt = ChatPromptTemplate.from_template(
"""
You are a social media expert.

Caption:

{caption}

Generate between 5 and 8 relevant hashtags.

Rules:
Return only the hashtags.
Return each hashtag on a separate line.
- One line.
- Space separated.
- No explanation.


Example:

#AI
#Python
#LangChain
#MachineLearning
IMPORTANT:

Return only the generated content.

Do NOT wrap the output in quotation marks.

Do NOT use Markdown.

Do NOT explain your answer.

Do NOT prefix with "Caption:" or "Output:".

"""
)