from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from langchain_core.prompts import ChatPromptTemplate
from services.llm import LLMService
from .serializers import RefineSerializer


class RefineAPIView(APIView):

    def post(self, request):
        serializer = RefineSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        platform = serializer.validated_data["platform"]
        content = serializer.validated_data["content"]
        action = serializer.validated_data["action"]
        target_tone = serializer.validated_data.get("target_tone", "engaging")
        target_language = serializer.validated_data.get("target_language", "English")
        custom_instruction = serializer.validated_data.get("custom_instruction", "")

        action_prompts = {
            "make_shorter": "Shorten the content to be concise and punchy without losing key meaning.",
            "more_engaging": "Make the content highly engaging, energetic, and hook-driven.",
            "add_cta": "Add a clear, compelling call-to-action (CTA) to the post.",
            "fix_grammar": "Fix all spelling, punctuation, and grammatical issues.",
            "change_tone": f"Rewrite the content strictly adopting a '{target_tone}' tone of voice.",
            "translate": f"Translate the content accurately into {target_language}.",
            "custom": custom_instruction or "Enhance and improve the post content.",
        }

        instruction = action_prompts.get(action, "Improve the content.")

        prompt = ChatPromptTemplate.from_template(
            """
You are an expert AI social media copywriter for {platform}.

Original Content:
"{content}"

Instruction:
{instruction}

Rules:
1. Optimize specifically for {platform}.
2. If Twitter/X, keep strictly under 280 characters.
3. Preserve relevant hashtags and emojis.
4. Return ONLY the final revised post text. Do not include quotes or intro text.
"""
        )

        llm = LLMService.get_llm()
        chain = prompt | llm
        response = chain.invoke({
            "platform": platform,
            "content": content,
            "instruction": instruction,
        })

        refined_content = response.content.strip()

        return Response({
            "platform": platform,
            "action": action,
            "refined_content": refined_content,
        })
