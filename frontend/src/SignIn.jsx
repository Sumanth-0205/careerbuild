import { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) return setError("Please fill in all fields.");

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) return setError("Please enter a valid email.");

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);

     

      toast.success("Logged in successfully!");
      localStorage.setItem("user", JSON.stringify(userCred.user));
      window.location.href = "/dashboard";
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={styles.input} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} style={styles.input} />
        <button onClick={handleSignIn} style={styles.button}>Sign In</button>
        <p style={styles.linkText}> Forgot password?{" "}<Link to="/reset" style={styles.link}>  Reset here</Link></p>
        <p style={styles.linkText}>New here? <Link to="/signup" style={styles.link}>Sign up</Link></p>
      </div>
    </div>
  );
}


const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f7f9fc" },
  form: { display: "flex", flexDirection: "column", padding: "2rem", borderRadius: "8px", background: "#fff", boxShadow: "0 8px 20px rgba(0,0,0,0.1)", minWidth: "300px" },
  title: { textAlign: "center", marginBottom: "1rem", color: "#333" },
  input: { padding: "10px", margin: "8px 0", borderRadius: "4px", border: "1px solid #ccc", fontSize: "16px" },
  button: { marginTop: "1rem", padding: "10px", background: "#4a90e2", color: "#fff", fontWeight: "bold", border: "none", borderRadius: "4px", cursor: "pointer" },
  linkText: { marginTop: "1rem", textAlign: "center", fontSize: "14px", color: "#666" },
  link: { color: "#4a90e2", fontWeight: "bold", textDecoration: "underline" },
  error: { color: "red", marginBottom: "0.5rem", textAlign: "center" }
};