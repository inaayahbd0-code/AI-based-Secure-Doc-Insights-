import api from "./api";

export const askQuestion = async (documentId, question) => {

    const response = await api.post("/chat", {
        document_id: documentId,
        question: question,
    });

    return response.data;
};