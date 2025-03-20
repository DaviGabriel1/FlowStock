import api from ".."

interface ILoginEmail {
    email: string,
    password: string
}

export const loginEmail = async (crendentials: ILoginEmail) => {
    return await api.post("/auth/email/login", {
        email: crendentials.email,
        password: crendentials.password
    });
}