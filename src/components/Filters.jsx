import React from "react";

export default function Filters({ query, setQuery, tasks }) {
  const categories = Array.from(
    new Set(["All", ...tasks.map((t) => t.category)])
  );

  return (
    <div className="bg-white p-4 rounded shadow-sm flex gap-3 items-center">
      <input
        id="filter-search"
        placeholder="Search tasks..."
        className="input"
        value={query.search}
        onChange={(e) => setQuery((q) => ({ ...q, search: e.target.value }))}
      />
      <select
        className="input"
        value={query.status}
        onChange={(e) => setQuery((q) => ({ ...q, status: e.target.value }))}
      >
        <option value="all">All statuses</option>
        <option value="todo">To do</option>
        <option value="inprogress">In progress</option>
        <option value="done">Done</option>
      </select>
      <select
        className="input"
        value={query.category}
        onChange={(e) => setQuery((q) => ({ ...q, category: e.target.value }))}
      >
        <option value="all">All categories</option>
        {categories.filter(Boolean).map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select
        className="input"
        value={query.priority}
        onChange={(e) => setQuery((q) => ({ ...q, priority: e.target.value }))}
      >
        <option value="all">All priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <select
        className="input"
        value={query.sortBy}
        onChange={(e) => setQuery((q) => ({ ...q, sortBy: e.target.value }))}
      >
        <option value="createdDesc">Newest</option>
        <option value="createdAsc">Oldest</option>
        <option value="dueAsc">Due soon</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
}
