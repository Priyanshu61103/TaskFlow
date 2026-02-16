import React from 'react'
import { useState } from 'react';
import "../style/navbar.css";
import { Link, useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [login, setLogin] = useState(localStorage.getItem("login"));
  console.log("login:",login);
  const navigate = useNavigate();
  const logout = () => {
      localStorage.removeItem("login");
      console.log("logout");
      setLogin(null);
      setTimeout(()=>{
         navigate("/login");
      },0);
  }
  return (
    <nav className = "nav">
        <h1 className = "logo">Task Flow</h1>
        {login ? <ul className = "list">
            <Link to = "/"><li>List</li></Link>
            <Link to = "/add"><li>Add Task</li></Link>
            <Link onClick={logout}><li>Logout</li></Link>
        </ul>:null}
    </nav>
  )
}

export default Navbar