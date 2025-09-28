export function filterAndSort(
  tasks,
  {
    search = "",
    status = "all",
    category = "all",
    priority = "all",
    sortBy = "createdDesc",
  }
) {
  let out = tasks.slice();
  if (search) {
    const q = search.toLowerCase();
    out = out.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        (t.description || "").toLowerCase().includes(q)
    );
  }
  if (status !== "all") out = out.filter((t) => t.status === status);
  if (category !== "all") out = out.filter((t) => t.category === category);
  if (priority !== "all") out = out.filter((t) => t.priority === priority);
  switch (sortBy) {
    case "dueAsc":
      out.sort((a, b) => (a.dueDate || 0) - (b.dueDate || 0));
      break;
    case "dueDesc":
      out.sort((a, b) => (b.dueDate || 0) - (a.dueDate || 0));
      break;
    case "priority":
      const map = { High: 0, Medium: 1, Low: 2 };
      out.sort((a, b) => (map[a.priority] || 3) - (map[b.priority] || 3));
      break;
    case "createdAsc":
      out.sort((a, b) => a.createdAt - b.createdAt);
      break;
    case "createdDesc":
    default:
      out.sort((a, b) => b.createdAt - a.createdAt);
      break;
  }
  return out;
}
