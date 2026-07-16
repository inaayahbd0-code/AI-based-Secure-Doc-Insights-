import numpy as np
from collections.abc import Sequence
from app.models.chunks import DocumentChunk
from app.services.embedding_service import generate_embedding

def cosine_similarity(vec1, vec2):
    
    vec1 = np.array(vec1)
    vec2 = np.array(vec2)

    return np.dot(vec1, vec2) / (
        np.linalg.norm(vec1) * np.linalg.norm(vec2)
    )

async def retrieve_relevant_chunks(
        question: str,
        chunks: Sequence[DocumentChunk],
        top_k : int = 5,
) -> list[DocumentChunk]:
    
    scores = []

    question_embedding = await generate_embedding(question)
    print(len(question_embedding))

    for chunk in chunks:
        if chunk.embedding is None:
            print(chunk.embedding is None)
            continue
        
        similarity = cosine_similarity(
            question_embedding,
            chunk.embedding,
        )

        scores.append((similarity, chunk))
        
    
    scores.sort(
        key=lambda x: x[0],
        reverse=True,
    )
    
    return [
    chunk
    for _, chunk in scores[:top_k]
    ]