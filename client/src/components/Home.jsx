import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  // console.log(tasks);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/get")
  //     .then((res) => {
  //       setTasks(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, [tasks]);

  // Function to fetch tasks
  const fetchTasks = () => {
    axios
      .get("http://localhost:3001/get")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => console.log(err));
  };

  // Fetch initial tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks when 'tasks' state changes
  useEffect(() => {
    fetchTasks();
  }, [tasks]);

  const handleDelete = (_id) => {
    axios
      .delete("http://localhost:3001/delete", { data: { IdForDelete: _id } })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleCheckboxChange = (_id, isChecked) => {
    axios
      .put("http://localhost:3001/update", { _id, isChecked })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>My Todo</h1>
      <Create />
      {tasks.length === 0 ? (
        <h1>No Records</h1>
      ) : (
        <div>
          {tasks.map((task) => (
            <div key={task._id}>
              <p
                style={{
                  textDecoration: task.isDone ? "line-through" : "none",
                }}
              >
                {task.task}
              </p>
              {/* Render other task properties here */}
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={() => handleCheckboxChange(task._id, !task.isDone)}
              />
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
