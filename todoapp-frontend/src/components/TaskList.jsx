import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); // track which task is being edited
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:8080/api/tasks");
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/tasks/${id}`);
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await axios.put(`http://localhost:8080/api/tasks/${task.id}`, {
      ...task,
      completed: !task.completed,
    });
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditingTask(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleUpdate = async (id) => {
    await axios.put(`http://localhost:8080/api/tasks/${id}`, {
      title: editTitle,
      description: editDescription,
      completed: tasks.find((t) => t.id === id).completed,
    });
    setEditingTask(null);
    fetchTasks();
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between border p-2 rounded"
        >
          {editingTask === task.id ? (
            <div className="flex gap-2 flex-1">
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border rounded px-2 py-1 flex-1"
              />
              <input
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="border rounded px-2 py-1 flex-1"
              />
              <button
                onClick={() => handleUpdate(task.id)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditingTask(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1">
                <h3
                  className={`font-semibold ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.title}
                </h3>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleComplete(task)}
                  className={`px-3 py-1 rounded ${
                    task.completed
                      ? "bg-yellow-400 text-black"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {task.completed ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => handleEdit(task)}
                  className="bg-blue-400 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
