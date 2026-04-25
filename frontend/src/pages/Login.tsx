import { Link, useNavigate } from "react-router-dom";
import { TrendingUp, Mail, Lock } from "lucide-react";
import "../App.css";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login and go to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="auth-logo">
          <TrendingUp className="logo-icon" size={32} />
          StockRuit
        </div>
        <h2>Welcome Back</h2>
        <p>Enter your details to access your dashboard.</p>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="input-group">
            <Mail size={18} className="input-icon" />
            <input type="email" placeholder="Email address" required />
          </div>
          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input type="password" placeholder="Password" required />
          </div>
          <button type="submit" className="auth-button">
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{" "}
          <Link to="/signup">
            <span>Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
