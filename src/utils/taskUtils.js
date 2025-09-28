import { v4 as uuidv4 } from "uuid";
export function createTask({
  title,
  description = "",
  category = "General",
  priority = "Medium",
  dueDate = null,
  status = "todo",
}) {
  return {
    id: uuidv4(),
    title,
    description,
    category,
    priority,
    dueDate,
    status,
    createdAt: Date.now(),
  };
}
export function updateTask(tasks, id, patch) {
  return tasks.map((t) => (t.id === id ? { ...t, ...patch } : t));
}
export function deleteTask(tasks, id) {
  return tasks.filter((t) => t.id !== id);
}
export function moveTask(tasks, id, newStatus, newIndex = null) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return tasks;
  const others = tasks.filter((t) => t.id !== id);
  const updated = { ...task, status: newStatus }; // place at end for simplicity (ordering handled in board)
  return [...others, updated];
}
