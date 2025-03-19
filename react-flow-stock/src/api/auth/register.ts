import api from ".."

interface IRegisterUser {
    name: string,
    email: string,
    phone: string,
    password: string,
    repeatPassword: string
}


const register = async (user: IRegisterUser) => {
    const result = await api.post("/auth/email/register", user);
    return result;
}

export default register;