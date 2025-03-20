import { useState } from "react";
import { showErrorAlert, showSuccessAlert } from "../../utils/alerts/alerts";
import { loginEmail } from "../../api/auth/loginEmail";

const LoginEmailForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
      const obj = {
          email,
          password
      };
      try {
        const result = await loginEmail(obj);
        showSuccessAlert(
          "Usuário Autenticado!",
          ""
        );
      } catch (error: any) {
        showErrorAlert(
          "erro",
            error.response?.data?.errors?.password ||
            error.response?.data?.errors?.email ||
            "ocorreu um erro ao fazer o login"
        );
      }
    };

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    };

    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    };

    return (
      <>
        <h1>Login</h1>
        <br></br>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            name="email"
            id="login-input"
            onChange={handleEmailInput}
            required
          />

          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            name="password"
            id="password-input"
            onChange={handlePasswordInput}
            required
          />

          <a href="/register/email">não tenho uma conta</a>

          <input type="submit" value="Entrar" />
        </form>
      </>
    );
}

export default LoginEmailForm;