import React, { useEffect, useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/list.css";
const List = () => {
  const [taskList, setTaskList] = useState();
  const [selectedTask, setSelectedTask] = useState([]);
  useEffect(() => {
    handleTaskList();
  }, []);

  const handleTaskList = async () => {
    let data = await fetch("http://localhost:3200/tasks", {
      credentials: "include",
    });
    data = await data.json();
    console.log(data);
    setTaskList(data.result);
  };

  const deleteTask = async (id) => {
    let result = await fetch("http://localhost:3200/delete/" + id, {
      credentials : "include",
      method: "delete",
    });

    result = await result.json();
    if (result.success) {
      handleTaskList();
    }
  };

  const handleCheckbox = (event) => {
    if (event.target.checked) {
      let items = taskList.map((item) => item._id);
      setSelectedTask(items);
    } else {
      setSelectedTask([]);
    }
  };

  const selectedSingleOne = (_id) => {
    if (selectedTask.includes(_id)) {
      let items = selectedTask.filter((item) => item != _id);
      setSelectedTask([items]);
    } else {
      setSelectedTask([_id, ...selectedTask]);
    }
  };

  const deleteTasks = async () => {
    let data = await fetch("http://localhost:3200/delete-multiple", {
      credentials : "include",
      method: "delete",
      body: JSON.stringify(selectedTask),
      headers: {
        "content-type": "Application/Json",
      },
    });

    data = await data.json();
  };

  return (
    <div className="mainDiv">
      <div>
        <div>
          <div className="list-container">
            <h1 className="to-do-heading">Task Flow</h1>
            <button
              onClick={deleteTasks}
              className="delete-button delete-multiple"
            >
              Delete
            </button>
            <ul className="task-lists">
              <li className="list-header">
                <input
                  onChange={(event) => handleCheckbox(event)}
                  type="checkbox"
                />
              </li>
              <li className="list-header">Sno</li>
              <li className="list-header">Task</li>
              <li className="list-header">Description</li>
              <li className="list-header">Action</li>
            </ul>
          </div>
          <div>
            {taskList &&
              taskList.map((item, index) => (
                <Fragment key={item._id}>
                  <ul className="task-lists">
                    <li className="list-item">
                      <input
                        onChange={() => selectedSingleOne(item._id)}
                        checked={selectedTask.includes(item._id)}
                        type="checkbox"
                      />
                    </li>
                    <li className="list-item">{index + 1}</li>
                    <li className="list-item">{item.title}</li>
                    <li className="list-item">{item.description}</li>
                    <li className="list-item">
                      <button
                        onClick={() => deleteTask(item._id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                      <Link to={"update/" + item._id}>
                        <button className="update-button">Update</button>
                      </Link>
                    </li>
                  </ul>
                </Fragment>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
