import React, { useEffect } from "react";
import "../style/addTask.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  useEffect(() => {
     if(localStorage.getItem("login")){
        navigate("/");
     } 
  }, []);
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const handleSignUp = async() => {
     let result = await fetch("http://localhost:3200/signup",{
         method : "post",
         body : JSON.stringify(userData),
         headers:{
            "content-type":"application/json"
         }
     })
     if(result.success){
        result = await result.json();
        document.cookie = "token="+result.token;
        localStorage.getItem("login",userData.email);
        navigate("/");
     }
  }
  return (
    <div className="mainDiv">
      <div className="container">
        <div>
          <h1>Sign Up</h1>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            onChange={(event) => {
              setUserData({ ...userData, name: event.target.value });
            }}
            placeholder="Enter User Name"
            name="name"
            id="name"
          />
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
              setUserData({ ...userData, password : event.target.value });
            }}
            placeholder="Enter User Password"
            name="password"
            id="password"
          />
          <button onClick = {handleSignUp}>Sign Up</button>
          <Link className = "link" to = "/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
