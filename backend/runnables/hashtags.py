from langchain_core.output_parsers import StrOutputParser

from prompts.hashtag_prompt import hashtag_prompt

from services.llm import LLMService

llm = LLMService.get_llm()

hashtag_chain = (
    hashtag_prompt
    | llm
    | StrOutputParser()
)