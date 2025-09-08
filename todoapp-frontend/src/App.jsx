import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">To-Do App</h1>
      <TaskForm onTaskAdded={() => setRefresh(!refresh)} />
      <TaskList refresh={refresh} />
    </div>
  );
}
