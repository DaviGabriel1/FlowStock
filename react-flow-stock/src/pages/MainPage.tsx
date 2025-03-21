import type React from "react";
import { Link } from "react-router-dom";

const MainPage: React.FC = () => {
  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900">
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl p-8 w-full max-w-4xl border border-gray-700/30 backdrop-blur-sm text-center">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 text-4xl md:text-5xl font-bold mb-6">
          Bem-vindo ao FlowStock
        </h1>

        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Uma plataforma segura e moderna para gerenciar suas informações e
          acessar nossos serviços exclusivos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-2xl mx-auto">
          <div className="bg-gray-800/60 border border-purple-700/30 rounded-lg p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
            <h2 className="text-white text-xl font-semibold mb-3">
              Já possui uma conta?
            </h2>
            <p className="text-gray-400 mb-4">
              Acesse sua conta para utilizar todos os recursos disponíveis.
            </p>
            <Link
              to="/login/email"
              className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2 px-6 rounded-md transition-all duration-200 shadow-lg hover:shadow-purple-500/20"
            >
              Entrar
            </Link>
          </div>

          <div className="bg-gray-800/60 border border-purple-700/30 rounded-lg p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
            <h2 className="text-white text-xl font-semibold mb-3">
              Novo por aqui?
            </h2>
            <p className="text-gray-400 mb-4">
              Crie sua conta gratuitamente e comece a usar nossos serviços.
            </p>
            <Link
              to="/register/email"
              className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2 px-6 rounded-md transition-all duration-200 shadow-lg hover:shadow-purple-500/20"
            >
              Cadastrar
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-300">
          <a
            href="#"
            className="hover:text-blue-200 transition-colors duration-200"
          >
            Sobre nós
          </a>
          <a
            href="#"
            className="hover:text-blue-200 transition-colors duration-200"
          >
            Termos de uso
          </a>
          <a
            href="#"
            className="hover:text-blue-200 transition-colors duration-200"
          >
            Política de privacidade
          </a>
          <a
            href="#"
            className="hover:text-blue-200 transition-colors duration-200"
          >
            Contato
          </a>
        </div>
      </div>

      <div className="mt-8 text-gray-400 text-sm">
        © {new Date().getFullYear()} FlowStock. Todos os direitos reservados.
      </div>
    </div>
  );
};

export default MainPage;
