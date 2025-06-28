import { auth } from "./firebase";
import { sendEmailVerification } from "firebase/auth";
import { toast } from "react-toastify";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleResend = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      toast.success("Verification email sent again!");
    } catch (err) {
      toast.error("Couldn't send verification link.");
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Welcome to your Dashboard 🎉</h2>
      <p>Logged in as: {user?.email}</p>

    {auth.currentUser && !auth.currentUser.emailVerified && (
        <div style={{ marginTop: "1rem" }}>
          <p style={{ color: "#e67e22" }}>
            Your email is not verified.
          </p>
          <button
            onClick={handleResend}
            style={{
              marginTop: "0.5rem",
              padding: "8px 16px",
              background: "#4a90e2",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Resend Verification Email
          </button>
        </div>
      )}

      <button
        onClick={handleLogout}
        style={{
          marginTop: "2rem",
          padding: "10px 20px",
          background: "#e74c3c",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}
