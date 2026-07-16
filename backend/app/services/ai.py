import os

from dotenv import load_dotenv
from google import genai


load_dotenv()


client = genai.Client(
    api_key=os.getenv("GOOGLE_API_KEY")
)

# Prompt to gemini to generate summary
def generate_summary(
    text: str
):

    response = client.models.generate_content(
        model="gemini-flash-latest",
        contents=f"""
        Summarize the following document.
        
        Give:
        - Main purpose
        - Important points
        - Key details
        
        Document:
        
        {text}
        """
    )

    return response.text