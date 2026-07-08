from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableParallel

from services.llm import LLMService

from prompts.twitter_prompt import twitter_prompt
from prompts.instagram_prompt import instagram_prompt
from prompts.linkedin_prompt import linkedin_prompt
from prompts.facebook_prompt import facebook_prompt

llm = LLMService.get_llm()

twitter_chain = (
    twitter_prompt
    | llm
    | StrOutputParser()
)

instagram_chain = (
    instagram_prompt
    | llm
    | StrOutputParser()
)

linkedin_chain = (
    linkedin_prompt
    | llm
    | StrOutputParser()
)

facebook_chain = (
    facebook_prompt
    | llm
    | StrOutputParser()
)

platform_chain = RunnableParallel(
    twitter=twitter_chain,
    instagram=instagram_chain,
    linkedin=linkedin_chain,
    facebook=facebook_chain,
)