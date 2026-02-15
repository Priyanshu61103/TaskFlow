import React, { useEffect } from "react";
import "../style/addTask.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
     if(localStorage.getItem("login")){
        navigate("/");
     }
  }, [])
  
  const handleLogin = async () => {
    let result = await fetch("http://localhost:3200/login", {
      method: "post",
      body: JSON.stringify(userData),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    if (result.success) {
      console.log(result);
      document.cookie = "token=" + result.token;
      localStorage.setItem("login",userData.email);
      navigate("/");
    }
  };
  return (
    <div className="mainDiv">
      <div className="container">
        <div>
          <h1>Login</h1>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            onChange={(event) => {
              setUserData({ ...userData, email: event.target.value });
            }}
            placeholder="Enter User Name"
            name="email"
            id="email"
          />
          <label htmlFor="password">Password</label>
          <input
            type="text"
            onChange={(event) => {
              setUserData({ ...userData, password: event.target.value });
            }}
            placeholder="Enter User Password"
            name="password"
            id="password"
          />
          <button onClick={handleLogin}>Login</button>
          <Link className="link" to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
