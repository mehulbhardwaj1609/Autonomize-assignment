import { useEffect, useState } from "react";
import { getTasks, deleteTask, createTask } from "../api/api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Tasks() {

  const [tasks, setTasks] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const handleCreateTask = async () => {

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    try {

      await createTask({
        title,
        description,
        status,
        priority,
        due_date: dueDate || null,
        assigned_to: assignedTo || null
      });

      setTitle("");
      setDescription("");
      setStatus("todo");
      setPriority("medium");
      setDueDate("");
      setAssignedTo("");

      setShowForm(false);
      loadTasks();

    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  const resetForm = () => {

  setTitle("");
  setDescription("");
  setStatus("todo");
  setPriority("medium");
  setDueDate("");
  setAssignedTo("");

};

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {

      await deleteTask(id);

      setTasks(tasks.filter(task => task.id !== id));

    } catch (error) {

      console.error("Delete failed", error);

    }
  };

  return (
    <div>

      <Navbar />

      <div className="container">

        <h2>All Tasks</h2>

        {/* Create Task Button */}

        <button
          className="create-btn"
          onClick={() => {
            if(showForm) resetForm();

            setShowForm(!showForm)}}
        >
          {showForm ? "Cancel" : "Create Task"}
        </button>

        {/* Task Form */}

        {showForm && (

          <div className="task-form">

            <input
              placeholder="Title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />

            <input className="description"
              placeholder="Description"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />

            <select
              value={status}
              onChange={(e)=>setStatus(e.target.value)}
            >
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>

            <select
              value={priority}
              onChange={(e)=>setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <input
              type="date"
              value={dueDate}
              onChange={(e)=>setDueDate(e.target.value)}
            />

            <input
              placeholder="Assigned To (User ID)"
              value={assignedTo}
              onChange={(e)=>setAssignedTo(e.target.value)}
            />

            <button onClick={handleCreateTask}>
              Add Task
            </button>

          </div>

        )}

        {/* Task List */}

        {!showForm && (

        <div className="task-list">

          {tasks.map(task => (

            <div className="task-card" key={task.id}>

              <h3>{task.title}</h3>

              <p>Description : {task.description}</p>

              <p>Status : {task.status}</p>

              <p>Priority : {task.priority}</p>

              <div className="task-buttons">

                <Link to={`/tasks/${task.id}`}>
                  <button className="view-btn">View</button>
                </Link>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(task.id)}
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

export default Tasks;