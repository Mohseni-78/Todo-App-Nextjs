import { useState } from "react";
// Antd Icons
import { PlusCircleOutlined } from "@ant-design/icons";
// Components
import RadioGroup from "./RadioGroup";

const AddTodo = () => {
  const [todo, setTodo] = useState("");
  const [status, setStatus] = useState("todo");
  const clickHandler = async () => {
    await fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo, status }),
    })
      .then((res) => res.json())
      .then((d) => {
        if (d.status === "Success") {
          setTodo("");
          setStatus("todo");
        }
      });
  };

  return (
    <div>
      <div className="flex gap-1 items-center mb-7">
        <PlusCircleOutlined />
        <h1 className="cursor-context-menu">Add new todo</h1>
      </div>
      <div className="flex flex-col  gap-5 items-start justify-center">
        <input
          className="p-3 rounded-xl border-0 outline-0 w-[30%]"
          type="text"
          placeholder="name todo..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <RadioGroup status={status} setStatus={setStatus} />
        <button className="btn bg-[#7a7a7a] text-white" onClick={clickHandler}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
