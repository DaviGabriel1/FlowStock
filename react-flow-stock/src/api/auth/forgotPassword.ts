import api from "..";

export const forgotPassword = async (email: string) => {
    return await api.post("/auth/email/forgot-password", {
        email
    });
}