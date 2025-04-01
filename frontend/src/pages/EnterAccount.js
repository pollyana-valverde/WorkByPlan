import { useNavigate } from "react-router-dom";

const EnterAccount = () => {
  const navegacao = useNavigate();

  const handleLogout = () => {
      navegacao("/", { replace: true });
  };

  setTimeout(() => {
    handleLogout();
  }, 500);

  return (
    <div className="intermediarioPage flex flex-column justify-content-center align-items-center">
      <div className="flex align-items-center gap-2">
        <h4>Entrando na sua conta</h4>
        <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
      </div>
      <p>Aguarde alguns instantes ...</p>
    </div>
  );
};

export default EnterAccount;
