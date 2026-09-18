import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CloseIcon, CheckIcon, EyeOpenIcon, EyeClosedIcon } from "../../assets/icons";
import users from "../../data/users";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFound, setIsEmailFound] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");


  const navigate = useNavigate();

  useEffect(() => {

    const savedUserEmail = localStorage.getItem("userEmail");
    if (savedUserEmail) {
      setEmail(savedUserEmail);
      setIsEmailFound(true)
    }
  }, []);

  const validate = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }

    if (!password.trim()) {
      setError("Password is required");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("loading");

    const user = users.find((u) => u.email === email && u.password === password);

    await new Promise((r) => setTimeout(r, 1000));

    if(!user) {
      setError("Invalid credentials")
      setStatus("idle")
      return;

    }

     if(user.frozen) {
      navigate("/account-frozen")
      setStatus("idle")
      return;
     }

    localStorage.setItem("userEmail", email);

    navigate("/success");
  };

  const handleSwitchAccount = () => {
    localStorage.removeItem("userEmail");
    setPassword("");
    setError("");
    setIsEmailFound(false)
  };

  return (
    <div className="login-wrapper">
      <form className="form-box" onSubmit={handleSubmit}>
        <button type="button" className="close-btn" aria-label="Close" onClick={() => navigate("/")}>
          <CloseIcon />
        </button>

        <h1>{isEmailFound ? `Welcome back, ${email}!` : `Log in`}</h1>

        <div className="card-content">
          <p className="register-text">
            Don't have an account? <Link to="/register" className="link-accent">Register Now</Link>
          </p>

          <div className="form-fields">
            {!isEmailFound && (
              <div className="input-group">
                <label>E-mail</label>
                <div className={`input-wrapper ${error ? "error" : ""} ${email && !error ? "confirmed" : ""}`}>
                  <input
                    type="email"
                    placeholder="Enter e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {email && !error && <span className="input-icon confirm"><CheckIcon /></span>}
                  {error && <span className="input-icon error"><CloseIcon /></span>}
                </div>
              </div>
            )}

            {error && <p className="field-error">{error}</p>}

            <div className="input-group">
              <label>Password</label>
              <div className={`input-wrapper password-wrapper ${error ? "error" : ""} ${password && !error ? "confirmed" : ""}`}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {password && !error && <span className="input-icon confirm"><CheckIcon /></span>}
                {error && <span className="input-icon error"><CloseIcon /></span>}
                <button
                  type="button"
                  className="eye-toggle"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </button>
              </div>
            </div>
          </div>

          <button type="submit" className="login-btn" disabled={status === "loading"}>
            {status === "loading" ? "LOGGING IN..." : "LOG IN"}
          </button>

          <Link to="/forgot-password" className="forgot-link link-secondary">
            Forgot your password?
          </Link>

          {isEmailFound && (
            <div className="switch-account">
              <p>Not {email}?</p>
              <button type="button" className="link-button" onClick={handleSwitchAccount}>
                Log in with another account
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
