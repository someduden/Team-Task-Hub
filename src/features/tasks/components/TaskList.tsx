import TaskItem from './TaskItem';
import type { Task } from '@/shared/types/types';

type Props = {
  tasks: Task[];
};

function TaskList({ tasks }: Props) {
  if (tasks.length === 0) {
    return <p>No tasks found</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
