import api from "..";

export const confirmEmailByHash = async (hash: string) => {
    return await api.post("/auth/email/confirm/new", {
        hash
    });
}