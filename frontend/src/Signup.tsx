import { Link, useNavigate } from "react-router-dom";
import { TrendingUp, Mail, Lock, User } from "lucide-react";
import "../App.css";

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="auth-logo">
          <TrendingUp className="logo-icon" size={32} />
          StockRuit
        </div>
        <h2>Create an Account</h2>
        <p>Start analyzing stocks with AI today.</p>

        <form onSubmit={handleSignup} className="auth-form">
          <div className="input-group">
            <User size={18} className="input-icon" />
            <input type="text" placeholder="Full Name" required />
          </div>
          <div className="input-group">
            <Mail size={18} className="input-icon" />
            <input type="email" placeholder="Email address" required />
          </div>
          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input type="password" placeholder="Create Password" required />
          </div>
          <button type="submit" className="auth-button">
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/">
            <span>Log in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
