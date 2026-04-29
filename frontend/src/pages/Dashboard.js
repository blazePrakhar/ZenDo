import { useEffect, useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔐 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out");
    navigate("/");
  };

  // 📥 Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  // ➕ Create task
  const createTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      const res = await API.post("/tasks", { title });
      setTasks([res.data, ...tasks]);
      setTitle("");
      toast.success("Task added");
    } catch (err) {
      toast.error("Failed to add task");
    }
  };

  // ❌ Delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
      toast.success("Task deleted");
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  // ✅ Toggle complete
  const toggleTask = async (id, completed) => {
    try {
      await API.put(`/tasks/${id}`, { completed: !completed });
      fetchTasks();
      toast.success(completed ? "Marked as pending" : "Task completed");
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  // 🚀 Load tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-start pt-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">

      {/* 🌿 Background blur shapes */}
      <div className="absolute w-72 h-72 bg-blue-300 blur-3xl opacity-30 top-10 left-10 rounded-full"></div>
      <div className="absolute w-72 h-72 bg-purple-300 blur-3xl opacity-30 bottom-10 right-10 rounded-full"></div>

      {/* 🧊 Main container */}
      <div className="relative z-10 bg-white/70 backdrop-blur-lg p-8 rounded-xl shadow-md border border-white/30 w-full max-w-2xl">

        {/* 🧘 Branding */}
        <h1 className="text-3xl font-bold text-center mb-2">
          ZenDo 🧘
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Stay calm. Stay productive.
        </p>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Your Tasks</h2>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition duration-200 active:scale-95"
          >
            Logout
          </button>
        </div>

        {/* Add Task */}
        <form onSubmit={createTask} className="flex gap-2 mb-6">
          <input
            className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a task..."
          />

          <button
            disabled={!title.trim()}
            className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600 transition duration-200 active:scale-95 disabled:opacity-50"
          >
            Add
          </button>
        </form>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-6">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-4">

            {/* Empty state */}
            {tasks.length === 0 && (
              <p className="text-gray-400 text-center italic">
                No tasks yet. Add one
              </p>
            )}

            {/* Task list */}
            {tasks.map((task) => (
              <div
                key={task._id}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition duration-200"
              >
                <span
                  className={`${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      toggleTask(task._id, task.completed)
                    }
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200 active:scale-95"
                  >
                    {task.completed ? "Undo" : "Done"}
                  </button>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200 active:scale-95"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}