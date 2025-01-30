// src/Login.js
import React, { useState, useEffect } from "react";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import './SignUp.css'; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  useEffect(() => {
    // GSAP animation to fade in the form container and slide it into place
    gsap.to(".form-container", { opacity: 1, duration: 1, y: 0, ease: "power3.out" });
    gsap.from(".form-title", { opacity: 1, x: -20, duration: 7, ease: "power3.out" });
    gsap.from(".input-field", { opacity: 1, x: -20, duration: 7, stagger: 15 });
    gsap.from(".submit-btn", { opacity: 1, y: 20, duration: 7, ease: "bounce.out" });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("login successfull");
      navigate("/dashboard"); // Redirect to Dashboard after successful login
    } catch (error) {
      alert(error.message); // Show error message if login fails
    }
  };

  // Toggle password visibility
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-container">
            <input
              className="input-field"
              type={showPassword ? "text" : "password"} // Toggle between text and password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="eye-icon" onClick={togglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show eye or eye-slash based on state */}
            </div>
          </div>
          <p>
          Not registered? <Link to="/signup">Go to Sign Up</Link>
        </p>
          <button className="submit-btn" type="submit">Login</button>
        </form>
        
      </div>
    </div>
  );
};

export default Login;
