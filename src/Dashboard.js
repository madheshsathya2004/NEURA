// src/Dashboard.js
import React, { useEffect, useState } from "react";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import "./App.css";
const Dashboard = () => {
  const [userData, setUserData] = useState(null);  // Store user data
  const [loading, setLoading] = useState(true);  // Handle loading state
  const navigate = useNavigate();

  useEffect(() => {
    gsap.from(".dashboard-container", { opacity: 1,duration: 1,y:0, ease: "power3.out" });

    // Fetch the user data only if the user is logged in
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());  // Set the fetched user data
        }
        setLoading(false);  // Set loading to false once data is fetched
      } else {
        // Redirect to login page if no user is logged in
        alert("You need to be logged in to view this page.");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    auth.signOut();  // Sign out the user
    alert("Logged out successfully!");
    navigate("/login");  // Redirect to login page after logout
  };

  if (loading) {
    return <div>Loading...</div>;  // Display loading state while fetching data
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard</h1>
      {userData ? (
        <div>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
