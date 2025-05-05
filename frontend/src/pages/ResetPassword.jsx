import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function ResetPassword({ toastRef }) {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, newPassword: password }),
      });

      const data = await res.json();
      if (res.ok) {
        toastRef.current?.show("Password reset successful!", "success");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toastRef.current?.show(data.message, "danger");
      }
    } catch (err) {
      toastRef.current?.show("Reset failed", "danger");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h4>Reset Password</h4>
      <form onSubmit={handleReset}>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-success w-100">
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
