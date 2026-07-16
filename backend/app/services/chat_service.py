from google import genai
import os
from dotenv import load_dotenv
from collections.abc import Sequence
from app.models.chunks import DocumentChunk
from app.services.retrieval_service import retrieve_relevant_chunks
from app.models.message import Message

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GOOGLE_API_KEY")
)

async def chat_with_document(
        question: str,
        chunks: Sequence[DocumentChunk],
        prev_messages: Sequence[Message],
):
    relevant_chunks = await retrieve_relevant_chunks(
        question = question,
        chunks=chunks,
    )
    print("Retrieved:", len(relevant_chunks))

    for i, chunk in enumerate(relevant_chunks):
        print(f"\nChunk {i+1}")
        print(chunk.chunk_text[:300])

    context = "\n\n".join(
    chunk.chunk_text
    for chunk in relevant_chunks
    )

    history = "\n".join(
        f"{message.role.capitalize()}: {message.content}"
        for message in prev_messages
    )

    prompt = f"""
    You are an AI assistant.

    Answer the user's question using ONLY the context below.

    If the answer is not present, say:

    "I couldn't find that information in the uploaded document."

    Conversation History:
    {history}

    Context:
    {context}

    Question:

    {question}

    """

    response = client.models.generate_content(
        model="gemini-flash-latest",
        contents = prompt,
    )

    return response.text