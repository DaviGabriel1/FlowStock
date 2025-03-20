import {  useNavigate, useSearchParams } from "react-router-dom";
import { confirmEmailByHash } from "../../api/auth/confirmNewEmail";
import { showErrorAlert, showSuccessAlert } from "../../utils/alerts/alerts";

const ConfirmEmail: React.FC = () => {

    const [searchHash] = useSearchParams();
    const navigate = useNavigate();

    const validateEmail = async () => {
        const hash = searchHash.get("hash");

        try {
            const validatedHash = await confirmEmailByHash(hash);

            if (validatedHash.status == 204) {
                showSuccessAlert("E-mail validado com sucesso", "clique em OK para redirecionar para a tela de login");
                navigate("/login/email");
            }
        } catch (error: any) {
            showErrorAlert(
                "erro",
                error.response?.data?.error ||
                "ocorreu um erro ao validar o E-mail"
            );
            navigate("/register/email");
        }
    }

    validateEmail();
    return (
        <>
            <h1>Confirme o seu Email:</h1>
        </>
    );
}

export default ConfirmEmail;