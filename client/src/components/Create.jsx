import React from "react";
import axios from "axios";

const Create = () => {
  const [todo, setTodo] = React.useState("");

  const handleUpload = async () => {
    axios
      .post("http://localhost:3001/add", { todo: todo })
      .then((res) => {
        setTodo("")
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <label>Add todos</label>
      <input
        type="text"
        placeholder="Enter todo"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
      />
      <button onClick={handleUpload}>Add todo</button>
    </div>
  );
};

export default Create;
