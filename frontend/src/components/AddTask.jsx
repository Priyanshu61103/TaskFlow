import React from "react";
import "../style/addTask.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddTask = () => {
  const [taskData, setTaskData] = useState();
  const navigate = useNavigate();
  const handleAddTask = async () => {
    console.log(taskData);
    let result = await fetch("http://localhost:3200/add-task",{
      method : "Post",
      body : JSON.stringify(taskData),
      headers:{
         "Content-Type":"Application/Json"
      }
    });
    result = await result.json();
    if(result){
      navigate("/");
      console.log("New Task Added");
    }
  };

  return (
    <div className="mainDiv">
      <div className="container">
        <div>
          <h1>Add New Task</h1>
          <label htmlFor="title">Title:</label>
          <input
            onChange={(event) => {
              setTaskData({ ...taskData, title: event.target.value });
            }}
            type="text"
            placeholder="Enter task title"
            name="title"
            id="title"
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            onChange={(event) => {
              setTaskData({ ...taskData, description: event.target.value });
            }}
            placeholder="Enter task description"
            cols="65"
            rows="7"
          ></textarea>
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
