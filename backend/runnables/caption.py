from langchain_core.output_parsers import StrOutputParser

from prompts.caption_prompt import caption_prompt
from services.llm import LLMService

llm = LLMService.get_llm()

caption_chain = (
    caption_prompt
    | llm
    | StrOutputParser()
)