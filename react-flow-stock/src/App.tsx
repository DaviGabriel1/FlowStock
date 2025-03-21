import { HashRouter, Route, Routes } from "react-router-dom"
import RegisterEmailForm from "./pages/auth/RegisterEmailForm";
import ConfirmNewEmail from "./pages/auth/ConfirmNewEmail";
import LoginEmailForm from "./pages/auth/LoginEmailForm";
import MainPage from "./pages/MainPage";

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/register/email" element={<RegisterEmailForm />} />
        <Route path="/confirm-email" element={<ConfirmNewEmail />} />
        <Route path="/login/email" element={ <LoginEmailForm/> } />
        <Route path="/" element={<MainPage/>} />
      </Routes>
    </HashRouter>
  );
}

export default App
