from runnables.caption import caption_chain

response = caption_chain.invoke(
    {
        "image_description": "A person presenting an AI chatbot.",
        "user_prompt": "I launched my AI chatbot today."
    }
)

print(response)