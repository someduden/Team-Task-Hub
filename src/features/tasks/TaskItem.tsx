import { useTasks } from '@/hooks/useTasks';
import { Button } from '@/shared/components/ui/button';
import type { Task } from '@/types/types';
import { useState } from 'react';
import TaskEditForm from './TaskEditForm';

type Props = {
  task: Task;
};

function TaskItem({ task }: Props) {
  const { dispatch } = useTasks();
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <TaskEditForm
        task={task}
        onCancel={() => setIsEditing(false)}
        onSave={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() =>
          dispatch({
            type: 'TOGGLE_TASK',
            payload: { id: task.id },
          })
        }
      />

      <span
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
      >
        {task.title}
      </span>

      <Button
        variant={'default'}
        size={'xs'}
        onClick={() => setIsEditing(true)}
      >
        Edit
      </Button>

      <Button
        variant={'outline'}
        size={'xs'}
        onClick={() =>
          dispatch({ type: 'DELETE_TASK', payload: { id: task.id } })
        }
      >
        X
      </Button>
    </div>
  );
}

export default TaskItem;
