import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    setError("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset link sent! Check your email.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.title}>Reset Password 🔐</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleReset} style={styles.button}>
          Send Reset Link
        </button>

        <p style={styles.linkText}>
          Remembered it?{" "}
          <Link to="/" style={styles.link}>
            Go back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f7f9fc",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
    borderRadius: "8px",
    background: "#fff",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    minWidth: "300px",
  },
  title: {
    textAlign: "center",
    marginBottom: "1rem",
    color: "#333",
  },
  input: {
    padding: "10px",
    margin: "8px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    marginTop: "1rem",
    padding: "10px",
    background: "#4a90e2",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  linkText: {
    marginTop: "1rem",
    textAlign: "center",
    fontSize: "14px",
    color: "#666",
  },
  link: {
    color: "#4a90e2",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "underline",
  },
  error: {
    color: "red",
    marginBottom: "0.5rem",
    textAlign: "center",
  },
};
