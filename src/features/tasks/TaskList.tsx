import { useTasks } from '@/hooks/useTasks';
import TaskItem from './TaskItem';
import { useTaskFilters } from '@/hooks/useTaskFilters';
import { useState } from 'react';
import { Input } from '@/shared/components/ui/input';
import type { StatusFilter } from '@/types/filters';

type Props = {
  selectedProjectId: string | null;
};

function TaskList({ selectedProjectId }: Props) {
  const { state } = useTasks();

  const { filteredTasks, stats } = useTaskFilters(state.tasks, {
    search: '',
    status: 'all',
    projectId: selectedProjectId,
  });

  if (filteredTasks.length === 0) {
    return <p>No tasks found</p>;
  }

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');

  return (
    <div>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks..."
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as StatusFilter)}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}

      <div>
        <p>Total: {stats.total}</p>
        <p>Completed: {stats.completed}</p>
        <p>Active: {stats.active}</p>
      </div>
    </div>
  );
}

export default TaskList;
