"use client";

import type React from "react";

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
      password,
    };
    try {
      await loginEmail(obj);
      showSuccessAlert("Usuário Autenticado!", "");
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
    <div className="min-h-screen min-w-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl p-8 w-full max-w-md border border-gray-700/30 backdrop-blur-sm">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="text-gray-300 text-sm font-medium"
            >
              E-mail:
            </label>
            <input
              type="email"
              name="email"
              id="login-input"
              onChange={handleEmailInput}
              required
              className="bg-gray-800/60 border border-purple-700/30 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label
              htmlFor="password"
              className="text-gray-300 text-sm font-medium"
            >
              Senha:
            </label>
            <input
              type="password"
              name="password"
              id="password-input"
              onChange={handlePasswordInput}
              required
              className="bg-gray-800/60 border border-purple-700/30 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>

          <div className="flex justify-end">
            <a
              href="#"
              className="text-blue-300 hover:text-blue-200 text-sm transition-colors duration-200"
            >
              Esqueci minha senha
            </a>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-md mt-4 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-purple-500/20"
          >
            Entrar
          </button>

          <div className="text-center mt-4">
            <a
              href="/#/register/email"
              className="text-blue-300 hover:text-blue-200 text-sm transition-colors duration-200"
            >
              Não tenho uma conta
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginEmailForm;