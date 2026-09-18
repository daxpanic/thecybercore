import Login from "Components/Login/login.jsx";
import Recovery from "Components/Recovery/recovery.jsx";
import RecoverySent from "Components/RecoverySent/recoverySent.jsx";
import NewPassword from "Components/NewPassword/newPassword.jsx";
import ChangePassword from "Components/ChangePassword/changePassword.jsx";
import AccountFrozen from "Components/AccountFrozen/accountFrozen.jsx";

function Showcase() {
  return (
    <div className="showcase-page">
      <h1>Component Showcase</h1>

      <div className="showcase-grid">
        <div className="showcase-item">
          <h2>Login</h2>
          <Login />
        </div>

        <div className="showcase-item">
          <h2>Password Recovery</h2>
          <Recovery mode="password" />
        </div>

        <div className="showcase-item">
          <h2>Username Recovery</h2>
          <Recovery mode="username" />
        </div>

        <div className="showcase-item">
          <h2>Recovery Sent</h2>
          <RecoverySent />
        </div>

        <div className="showcase-item">
          <h2>Account Frozen</h2>
          <AccountFrozen />
        </div>

        <div className="showcase-item">
          <h2>New Password</h2>
          <NewPassword />
        </div>

        <div className="showcase-item">
          <h2>Change Password</h2>
          <ChangePassword />
        </div>
      </div>
    </div>
  );
}

export default Showcase;