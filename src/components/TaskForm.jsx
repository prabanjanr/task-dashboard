import React, { useState, useEffect } from "react";

export default function TaskForm({ open, initial, onClose, onSave }) {
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "General",
    priority: "Medium",
    dueDate: "",
    status: "todo",
  });

  useEffect(() => {
    if (initial) setData((d) => ({ ...d, ...(initial.id ? initial : {}) }));
  }, [initial]);

  if (!open) return null;

  function handleSubmit(e) {
    e.preventDefault();
    const save = { ...data };
    if (!save.title.trim()) return alert("Title required");
    onSave(save, initial && initial.id);
  }

  return (
    <div className="modal">
      <form className="modal-content" onSubmit={handleSubmit}>
        <h2>{initial && initial.id ? "Edit Task" : "New Task"}</h2>
        <input
          placeholder="Title"
          className="input"
          value={data.title}
          onChange={(e) => setData((d) => ({ ...d, title: e.target.value }))}
        />
        <textarea
          placeholder="Description"
          className="input"
          value={data.description}
          onChange={(e) =>
            setData((d) => ({ ...d, description: e.target.value }))
          }
        />
        <input
          placeholder="Category"
          className="input"
          value={data.category}
          onChange={(e) => setData((d) => ({ ...d, category: e.target.value }))}
        />
        <select
          className="input"
          value={data.priority}
          onChange={(e) => setData((d) => ({ ...d, priority: e.target.value }))}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <select
          className="input"
          value={data.status}
          onChange={(e) => setData((d) => ({ ...d, status: e.target.value }))}
        >
          <option value="todo">To do</option>
          <option value="inprogress">In progress</option>
          <option value="done">Done</option>
        </select>
        <div className="flex gap-2 justify-end mt-2">
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn primary" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
