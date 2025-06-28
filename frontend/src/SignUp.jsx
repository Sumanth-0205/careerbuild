import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "./firebase"; // Ensure this path is correct in your project
import axios from "axios";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    setError("");

    if (!email || !password) return setError("Please fill in all fields.");

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) return setError("Please enter a valid email.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      // ✅ Save name in Firebase profile
      await updateProfile(userCred.user, { displayName: name });

      // ✅ Send Firebase verification
      await sendEmailVerification(userCred.user);
      toast.success("Verification email sent!");

      // ✅ Call Render backend to send welcome email
      await axios.post("https://careerbuild-tzer.onrender.com/sendWelcomeEmail", {
        email,
        name: name || "there",
      });

      localStorage.setItem("user", JSON.stringify(userCred.user));
      window.location.href = "/dashboard";

    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.title}>Create Account ✨</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSignUp} style={styles.button}>Sign Up</button>
        <p style={styles.linkText}>
          Already have an account? <Link to="/" style={styles.link}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex", justifyContent: "center", alignItems: "center",
    height: "100vh", background: "#f7f9fc"
  },
  form: {
    display: "flex", flexDirection: "column", padding: "2rem",
    borderRadius: "8px", background: "#fff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)", minWidth: "300px"
  },
  title: {
    textAlign: "center", marginBottom: "1rem", color: "#333"
  },
  input: {
    padding: "10px", margin: "8px 0", borderRadius: "4px",
    border: "1px solid #ccc", fontSize: "16px"
  },
  button: {
    marginTop: "1rem", padding: "10px", background: "#4a90e2",
    color: "#fff", fontWeight: "bold", border: "none",
    borderRadius: "4px", cursor: "pointer"
  },
  linkText: {
    marginTop: "1rem", textAlign: "center", fontSize: "14px", color: "#666"
  },
  link: {
    color: "#4a90e2", fontWeight: "bold", textDecoration: "underline"
  },
  error: {
    color: "red", marginBottom: "0.5rem", textAlign: "center"
  }
};
