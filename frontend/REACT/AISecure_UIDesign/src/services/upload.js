import api from "./api"

export const uploadDocument = async (file) =>
     {
        const formData = new FormData();

        formData.append("file", file);

        const response = await api.post(
            "/documents/upload",
            formData
        );

        return response.data;
     }; 