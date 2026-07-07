from typing import List
from langchain_text_splitters import RecursiveCharacterTextSplitter



def chunk_text(
        text: str,
        chunk_size: int = 500,
        overlap: int = 100
) -> List[str]:
    
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        chunks.append(chunk)
        start += chunk_size - overlap

    return chunks

def split_text(
    text: str
):
    
    splitter = RecursiveCharacterTextSplitter(
        chunk_size = 1000,
        chunk_overlap = 200
    )

    chunks = splitter.split_text(text)

    return splitter.split_text(text)

def create_chunks(text: str, document_id):
    chunks = split_text(text)

    return [
        {
            "document_id" : document_id,
            "chunk_text": chunk
        }
        for chunk in chunks
    ]