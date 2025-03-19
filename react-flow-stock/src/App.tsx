import { HashRouter, Route, Routes } from "react-router-dom"
import RegisterForm from "./pages/auth/RegisterForm";
import ConfirmEmail from "./pages/auth/ConfirmEmail";

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/confirm-email" element={<ConfirmEmail/>} />
        <Route path="/" element={<h1>Rota Main</h1>} />
      </Routes>
    </HashRouter>
  );
}

export default App
