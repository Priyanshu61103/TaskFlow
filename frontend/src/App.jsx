import React from "react";
import "./style/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddTask from "./components/AddTask";
import List from "./components/List";
import UpdateTask from "./components/UpdateTask"
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Protected from "./components/Protected";
const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Protected><List/></Protected>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path = "/login" element={<Login/>}></Route>
          <Route path="/add" element={<Protected><AddTask/></Protected>}></Route>
          <Route path = "/update/:id" element = {<Protected><UpdateTask/></Protected>}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
