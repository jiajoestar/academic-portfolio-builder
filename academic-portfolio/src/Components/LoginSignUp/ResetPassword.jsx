import { useParams } from "react-router-dom";
import { useState } from 'react';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    alert("Password successfully reset!");
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='password'
          placeholder="New password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword