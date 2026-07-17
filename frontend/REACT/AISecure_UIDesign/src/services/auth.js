import api from "./api";


export const loginuser = async (email, password) => {
    const response = await api.post("/auth/login", {
        email,
        password,
    });
    
    localStorage.setItem("token", response.data.access_token);
    
    return response.data;
};


