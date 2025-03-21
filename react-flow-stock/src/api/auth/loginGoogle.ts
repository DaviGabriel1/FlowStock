import api from ".."

export const loginGoogle = async (idToken:string) => {
    return await api.post("/auth/google/login", {
        idToken
    });
}