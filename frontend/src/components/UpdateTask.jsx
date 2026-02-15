import React, { useState , useEffect } from "react";
import "../style/addTask.css";
import { useNavigate, useParams } from "react-router-dom";
const UpdateTask = () => {
  const [taskData, setTaskData] = useState();  
  const [updateData, setUpdateData] = useState();
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(() => {
     populateData();
  }, []);
  
  const populateData = async () => {
      let info = await fetch("http://localhost:3200/update/"+id);
      info = await info.json();
      setTaskData(info.result);
      setUpdateData(info.result);
  }

  const handleUpdateTask = async () => {
     let task = await fetch("http://localhost:3200/update-task",{
        method : "put",
        body : JSON.stringify(updateData),
        headers : {
            "Content-Type":"Application/Json"
        }
     })

     task = await task.json();
     if(task){
        navigate("/");
     }
  }

  return (
    <div className="mainDiv">
      <div className="container">
        <div>
          <h1>Update Task</h1>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            placeholder="Enter task title"
            onChange = {(event) => setUpdateData({...updateData,title:event.target.value})}
            name="title"
            id="title"
            value = {updateData?.title}
          />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="Enter task description"
            onChange = {(event)=>setUpdateData({...updateData, description : event.target.value})}
            cols="65"
            rows="7"
            value = {updateData?.description}
          ></textarea>
          <button onClick = {handleUpdateTask}>Update Task</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
