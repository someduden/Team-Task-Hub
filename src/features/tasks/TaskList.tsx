import { useTasks } from '@/hooks/useTasks';
import TaskItem from './TaskItem';
import { useTaskFilters } from '@/hooks/useTaskFilters';

type Props = {
  selectedProjectId: string | null;
};

function TaskList({ selectedProjectId }: Props) {
  const { state } = useTasks();

  const { filteredTasks } = useTaskFilters(state.tasks, {
    search: '',
    status: 'all',
    projectId: selectedProjectId,
  });

  if (filteredTasks.length === 0) {
    return <p>No tasks found</p>;
  }

  return (
    <div>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
