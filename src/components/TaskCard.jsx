import React from 'react';

export default function TaskCard({task, onDelete, setEditing}){
  return (
    <div className="task-card">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold">{task.title}</div>
          <div className="text-sm text-gray-600">{task.category} • {task.priority}</div>
        </div>
        <div className="flex gap-2">
          <button className="btn-small" onClick={()=> setEditing(task)}>Edit</button>
          <button className="btn-small danger" onClick={()=> onDelete(task.id)}>Del</button>
        </div>
      </div>
      {task.description && <div className="mt-2 text-sm">{task.description}</div>}
    </div>
  );
}
