from google import genai
from google.genai.errors import ServerError
from dotenv import load_dotenv
import os
import asyncio

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GOOGLE_API_KEY")
)

async def generate_embedding(text: str) -> list[float]:
    for _ in range(3):
        try:
            response = client.models.embed_content(
                model="gemini-embedding-001",
                contents=text,
            )

            embeddings = response.embeddings

            if not embeddings:
                raise ValueError("No embeddings returned")

            values = embeddings[0].values

            if values is None:
                raise ValueError("Embedding values missing")

            return values      

        except ServerError:
            await asyncio.sleep(2)

    raise RuntimeError("Embedding API unavailable after 3 retries.")