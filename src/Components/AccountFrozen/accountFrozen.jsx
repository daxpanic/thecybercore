import { useNavigate } from "react-router-dom";
import { CloseIcon } from "../../assets/icons";

function AccountFrozen() {
  const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      <div className="form-box">
        <button type="button" className="close-btn" aria-label="Close" onClick={() => navigate("/login")}>
          <CloseIcon />
        </button>

        <h1>Account Frozen</h1>

        <p className="subtitle">
          Your account has been temporarily blocked because you exceeded the number of login attempts with the wrong password.
          Do not hesitate to contact us via Live Chat in case of any questions or issues
        </p>

        <button type="submit" className="login-btn" onClick={() => navigate("/login")}>
            OK    
        </button>
      </div>
    </div>
  );
}

export default AccountFrozen;