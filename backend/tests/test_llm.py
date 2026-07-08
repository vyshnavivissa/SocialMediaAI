from services.llm import LLMService

llm = LLMService.get_llm()

response = llm.invoke("Say hello")

print(response.content)