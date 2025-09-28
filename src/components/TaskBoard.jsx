import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const COLUMNS = [
  {id: 'todo', title: 'To do'},
  {id: 'inprogress', title: 'In progress'},
  {id: 'done', title: 'Done'}
];

export default function TaskBoard({tasks, onUpdate, onDelete, setEditing}){
  const grouped = {
    todo: tasks.filter(t=> t.status==='todo'),
    inprogress: tasks.filter(t=> t.status==='inprogress'),
    done: tasks.filter(t=> t.status==='done')
  };

  function onDragEnd(result){
    const {destination, source, draggableId} = result;
    if(!destination) return;
    const destCol = destination.droppableId;
    const srcCol = source.droppableId;
    if(destCol === srcCol) return;
    onUpdate(draggableId, {status: destCol});
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-4">
        {COLUMNS.map(col => (
          <div key={col.id} className="bg-white p-3 rounded shadow-sm">
            <h3 className="font-semibold mb-2">{col.title} ({grouped[col.id].length})</h3>
            <Droppable droppableId={col.id}>
              {(provided)=> (
                <div ref={provided.innerRef} {...provided.droppableProps} className="min-h-[100px]">
                  {grouped[col.id].map((task, index)=> (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(p)=> (
                        <div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps}>
                          <TaskCard task={task} onDelete={onDelete} setEditing={setEditing} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
