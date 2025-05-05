import { useState } from "react";

function ForgotPassword({ toastRef }) {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        toastRef.current?.show(
          "Password reset link sent to your email",
          "success"
        );
      } else {
        toastRef.current?.show(data.message || "Error", "danger");
      }
    } catch (err) {
      toastRef.current?.show("Server error", "danger");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h4>Forgot Password</h4>
      <p>Enter your email to receive a password reset link.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-100">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
