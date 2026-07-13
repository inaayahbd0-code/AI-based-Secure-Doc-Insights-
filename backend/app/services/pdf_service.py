import fitz
from pathlib import Path
from typing import cast

# Extract text from the pdf using fitz module
def extract_text_from_pdf(pdf_path: Path) -> str:
    """TO EXTRACT ALL TEXT FROM A PDF FILE IN A STRING FILE"""

    document = fitz.open(pdf_path)
    # Parses the pdf page by page
    text = ""
    for page in document:
        # Ensures pylance type checker that get_text gives str type output
        page_text = cast(str, page.get_text("text"))
        text += page_text

    document.close()

    return text
