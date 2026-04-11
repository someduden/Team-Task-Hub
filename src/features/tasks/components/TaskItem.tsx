import { useTasks } from '@/shared/hooks/useTasks';
import type { Task } from '@/shared/types/types';
import { useState } from 'react';

type Props = {
  task: Task;
};

const priorityColors = {
  low: 'bg-green-500',
  medium: 'bg-yellow-400',
  high: 'bg-red-500',
};

function TaskItem({ task }: Props) {
  const { dispatch } = useTasks();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleToggle = () => {
    dispatch({
      type: 'TOGGLE_TASK',
      payload: { id: task.id },
    });
  };

  const handleDelete = () => {
    dispatch({
      type: 'DELETE_TASK',
      payload: { id: task.id },
    });
  };

  const handleSave = () => {
    if (!title.trim()) return;

    dispatch({
      type: 'UPDATE_TASK',
      payload: {
        id: task.id,
        title,
      },
    });

    setIsEditing(false);
  };

  return (
    <div className="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        className="cursor-pointer"
      />
      <span
        className={`w-2 h-2 rounded-full ${priorityColors[task.priority]}`}
      />

      <div className="flex-1">
        {isEditing ? (
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') setIsEditing(false);
            }}
            className="w-full bg-transparent outline-none border-b border-gray-300"
          />
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)}
            className={`cursor-text ${
              task.completed ? 'line-through text-gray-400' : 'text-gray-800'
            }`}
          >
            {task.title}
          </span>
        )}
      </div>

      <div className="opacity-0 group-hover:opacity-100 flex gap-2 transition">
        <button
          onClick={() => setIsEditing(true)}
          className="text-gray-400 hover:text-black"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="text-gray-400 hover:text-red-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
