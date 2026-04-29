import { useEffect, useState } from "react";
import API from "../utils/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const toggleTask = async (id, completed) => {
    await API.put(`/tasks/${id}`, { completed: !completed });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
  <div style={{ maxWidth: "600px", margin: "40px auto" }}>
    <h2>Task Dashboard</h2>

    <button onClick={logout} style={{ float: "right", background: "red" }}>
      Logout
    </button>

    <div style={{ marginTop: "20px" }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task..."
      />
      <button onClick={addTask}>Add</button>
    </div>

    <div style={{ marginTop: "20px" }}>
      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            background: "white",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.title}
          </span>

          <div>
            <button onClick={() => toggleTask(task._id, task.completed)}>
              {task.completed ? "Undo" : "Done"}
            </button>

            <button
              onClick={() => deleteTask(task._id)}
              style={{ background: "red", marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}