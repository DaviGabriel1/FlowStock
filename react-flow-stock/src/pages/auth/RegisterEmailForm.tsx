"use client";

import type React from "react";

import { useState } from "react";
import { showErrorAlert, showSuccessAlert } from "../../utils/alerts/alerts";
import register from "../../api/auth/register";

const RegisterEmailForm: React.FC = () => {
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
      await register(obj);
      showSuccessAlert(
        "Usuário registrado com sucesso!",
        "veja a caixa de entrada do E-mail para validar usuário"
      );
    } catch (error: any) {
      showErrorAlert(
        "erro",
        error.response?.data?.errors?.email ||
          error.response?.data?.errors?.password ||
          "ocorreu um erro ao se cadastrar"
      );
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
    <div className="min-h-screen min-w-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl p-8 w-full max-w-md border border-gray-700/30 backdrop-blur-sm">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 text-2xl font-bold mb-6 text-center">
          Cadastro de usuário
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="name" className="text-gray-300 text-sm font-medium">
              Nome Completo:
            </label>
            <input
              type="text"
              name="name"
              id="name-input"
              onChange={handleNameInput}
              required
              className="bg-gray-800/60 border border-purple-700/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>

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
              className="bg-gray-800/60 border border-purple-700/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label
              htmlFor="phone"
              className="text-gray-300 text-sm font-medium"
            >
              Telefone:
            </label>
            <input
              type="text"
              name="phone"
              id="phone-input"
              onChange={handlePhoneInput}
              className="bg-gray-800/60 border border-purple-700/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
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
              className="bg-gray-800/60 border border-purple-700/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label
              htmlFor="repeat-password"
              className="text-gray-300 text-sm font-medium"
            >
              Repita a senha:
            </label>
            <input
              type="password"
              name="repeat-password"
              id="repeat-password-input"
              onChange={handleRepeatPasswordInput}
              required
              className="bg-gray-800/60 border border-purple-700/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>

          <a
            href="#"
            className="text-blue-300 hover:text-blue-200 text-sm text-center mt-2 transition-colors duration-200"
          >
            Faça Login pelo google!
          </a>

          <a
            href="/#/login/email"
            className="text-blue-300 hover:text-blue-200 text-sm text-center transition-colors duration-200"
          >
            Já tenho uma conta!
          </a>

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-md mt-4 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-purple-500/20"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterEmailForm;
