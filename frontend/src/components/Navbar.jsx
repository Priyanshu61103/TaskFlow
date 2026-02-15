import React from 'react'
import { useState } from 'react';
import "../style/navbar.css";
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [login, setLogin] = useState(localStorage.getItem("login"));
  return (
    <nav className = "nav">
        <h1 className = "logo">Task Flow</h1>
        {login ? <ul className = "list">
            <Link to = "/"><li>List</li></Link>
            <Link to = "/add"><li>Add Task</li></Link>
            <Link to = "/"><li>Logout</li></Link>
        </ul>:null}
    </nav>
  )
}

export default Navbar