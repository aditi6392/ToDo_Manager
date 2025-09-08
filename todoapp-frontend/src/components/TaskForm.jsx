import React, { useState } from "react";
import axios from "axios";

export default function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:8080/api/tasks", {
      title,
      description,
      completed: false
    });

    setTitle("");
    setDescription("");
    onTaskAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded px-2 py-1 flex-1"
        required
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded px-2 py-1 flex-1"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
        Add Task
      </button>
    </form>
  );
}
