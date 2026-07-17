import api from "./api";

export const getDocuments = async () => {

    console.log(localStorage.getItem("token"));
    const response = await api.get("/documents");

    return response.data;
};