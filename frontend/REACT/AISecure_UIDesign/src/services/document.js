import api from "./api";

export const getDocuments = async () => {

    console.log(localStorage.getItem("token"));
    const response = await api.get("/documents");

    return response.data;
};
export const deleteDocument = async (documentId) => {

    const response = await api.delete(
        `/documents/${documentId}`
    );

    return response.data;

};