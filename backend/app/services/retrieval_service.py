import numpy as np

from app.models.chunks import DocumentChunk
from app.services.embedding_service import generate_embedding

def cosine_similarity(vec1, vec2):
    
    vec1 = np.array(vec1)
    vec2 = np.array(vec2)

    return np.dot(vec1, vec2)

def retrieve_relevant_chunks(
        question: str,
        chunks: list[DocumentChunk],
        top_k : int = 5,
):
    scores = []
    question_embedding = generate_embedding(question)
    for chunk in chunks:
        if chunk.embedding is None:
            continue
        
        similarity = cosine_similarity(
            question_embedding,
            chunk.embedding,
        )

        scores.append(
            (similarity, chunk)
        )
        scores.sort(
            key=lambda x: x[0],
            reverse=True,
        )

        return [
        chunk
        for _, chunk in scores[:top_k]
    ]