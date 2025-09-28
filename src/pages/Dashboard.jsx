import React, { useMemo, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { createTask, updateTask, deleteTask } from "../utils/taskUtils";
import { filterAndSort } from "../utils/filterUtils";
import TaskBoard from "../components/TaskBoard";
import TaskForm from "../components/TaskForm";
import Filters from "../components/Filters";
import KeyboardShortcuts from "../components/KeyboardShortcuts";

const SAMPLE = [
  createTask({
    title: "Design landing",
    category: "Design",
    priority: "High",
    status: "todo",
  }),
  createTask({
    title: "API: auth",
    category: "Backend",
    priority: "Medium",
    status: "inprogress",
  }),
  createTask({
    title: "Write tests",
    category: "QA",
    priority: "Low",
    status: "done",
  }),
];

export default function Dashboard() {
  const [tasks, setTasks] = useLocalStorage("task-dashboard.tasks", SAMPLE);
  const [query, setQuery] = useState({
    search: "",
    status: "all",
    category: "all",
    priority: "all",
    sortBy: "createdDesc",
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(() => filterAndSort(tasks, query), [tasks, query]);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, [tasks]);

  function handleCreate(data) {
    setTasks((prev) => [createTask(data), ...prev]);
  }
  function handleUpdate(id, patch) {
    setTasks((prev) => updateTask(prev, id, patch));
  }
  function handleDelete(id) {
    setTasks((prev) => deleteTask(prev, id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Task Management Dashboard</h1>
        <div className="flex gap-2">
          <button className="btn" onClick={() => setEditing({})}>
            + New Task
          </button>
        </div>
      </div>

      <Filters query={query} setQuery={setQuery} tasks={tasks} />

      <div className="mt-4">
        <TaskBoard
          tasks={filtered}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          setEditing={setEditing}
        />
      </div>

      <TaskForm
        open={!!editing}
        initial={editing}
        onClose={() => setEditing(null)}
        onSave={(data, id) => {
          if (id) handleUpdate(id, data);
          else handleCreate(data);
          setEditing(null);
        }}
      />

      <KeyboardShortcuts
        onNew={() => setEditing({})}
        onFocusSearch={() => document.getElementById("filter-search")?.focus()}
      />

      {loading && <div className="loading">Loading...</div>}
    </div>
  );
}
