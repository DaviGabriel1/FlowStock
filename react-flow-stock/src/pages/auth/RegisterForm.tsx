import { useState } from "react";
import { showErrorAlert, showSuccessAlert } from "../../utils/alerts/alerts";
import register from "../../api/auth/register";


const RegisterForm: React.FC = () => {

    
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [repeatPassword, setRepeatPassword] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== repeatPassword) {
        return showErrorAlert("Senha inválida", "as senhas devem coincidir");
        }

        const obj = {
        name,
        email,
        phone,
        password,
        repeatPassword,
        };
        try {
        const result = await register(obj);
        showSuccessAlert(
            "Usuário registrado com sucesso!",
            "veja a caixa de entrada do E-mail para validar usuário"
        );
        } catch (error) {
        showErrorAlert("erro", "ocorreu um erro ao se cadastrar");
        }
    };

    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    };

    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleRepeatPasswordInput = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRepeatPassword(e.target.value);
    };
    return (
      <>
        <h1>Cadastro de usuário</h1>
        <br></br>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="name">Nome Completo:</label>
          <input
            type="text"
            name="name"
            id="name-input"
            onChange={handleNameInput}
            required
          />

          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            name="email"
            id="login-input"
            onChange={handleEmailInput}
            required
          />

          <label htmlFor="phone">Telefone:</label>
          <input
            type="text"
            name="phone"
            id="phone-input"
            onChange={handlePhoneInput}
          />

          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            name="password"
            id="password-input"
            onChange={handlePasswordInput}
            required
          />

          <label htmlFor="repeat-password">Repita a senha:</label>
          <input
            type="password"
            name="repeat-password"
            id="repeat-password-input"
            onChange={handleRepeatPasswordInput}
            required
          />

          <a href="#">Faça Login pelo google!</a>

          <input type="submit" value="Cadastrar" />
        </form>
      </>
    );
}

export default RegisterForm;