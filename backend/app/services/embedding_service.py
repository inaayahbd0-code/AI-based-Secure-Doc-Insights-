from google import genai
from google.genai import types
from dotenv import load_dotenv
import os

load_dotenv()


client = genai.Client(
    api_key = os.getenv("GEMINI_API_KEY")
)

def generate_embedding(text:str) -> list[float]:
    response = client.models.embed_content(
        model = "text-embedding-004",
        contents = text,
    )
    if not response.embeddings:
        raise ValueError("Gemini did not return any embeddings.")

    embedding = response.embeddings[0]

    if embedding.values is None:
        raise ValueError("Embedding values are missing.")

    return embedding.values