// src/SignUp.js
import React, { useState, useEffect } from "react";
import { auth, db } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {  doc, setDoc } from "firebase/firestore";
import gsap from "gsap";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import "./SignUp.css"

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  useEffect(() => {
    gsap.to(".form-container", { opacity: 1, duration: 1, y: 0, ease: "power3.out" });
    gsap.from(".form-title", { opacity: 1, x: -20, duration: 7, ease: "power3.out" });
    gsap.from(".input-field", { opacity: 1, x: -20, duration: 7, stagger: 15 });
    gsap.from(".submit-btn", { opacity: 1, y: 20, duration: 7, ease: "bounce.out" });
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      alert("Sign-up successful!");

      // Store additional user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        phone: phone,
        email: user.email,
        uid: user.uid,
      });
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  // Toggle password visibility
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <h2 className="form-title">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <input
            className="input-field"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="input-field"
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
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
          Already have an account? <Link to="/login">Go to Login</Link>
        </p>
          <button className="submit-btn" type="submit">Sign Up</button>
        </form>
       
      </div>
    </div>
  );
};

export default SignUp;
