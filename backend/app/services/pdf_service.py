import fitz
from pathlib import Path
from typing import cast

def extract_text_from_pdf(pdf_path: Path) -> str:
    """TO EXTRACT ALL TEXT FROM A PDF FILE IN A STRING FILE"""

    document = fitz.open(pdf_path)
    text = ""
    for page in document:
        page_text = cast(str, page.get_text("text"))
        text += page_text

    document.close()

    return text
