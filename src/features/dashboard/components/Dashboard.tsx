import { useTaskFilters } from '@/hooks/useTaskFilters';
import { useTasks } from '@/hooks/useTasks';
import { StatsCard } from './StatsCard';
import { ProgressBar } from './ProgressBar';
import { useTaskFilterState } from '@/hooks/useTaskFilterState';
import AddProjectForm from '@/features/projects/AddProjectForm';
import ProjectList from '@/features/projects/ProjectList';
import AddTaskForm from '@/features/tasks/AddTaskForm';
import TaskList from '@/features/tasks/TaskList';

export function Dashboard() {
  const { state, dispatch } = useTasks();

  const { filters, setSearch, setStatus, setProjectId } = useTaskFilterState();

  const { filteredTasks, stats } = useTaskFilters(state.tasks, filters);

  const completionRate =
    stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

  return (
    <div>
      <h1 className="text-2xl font-bold">Team Task Hub</h1>

      {/* Filters */}
      <div className="flex gap-3">
        <input
          value={filters.search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
        />

        <select
          value={filters.status}
          onChange={(e) => setStatus(e.target.value as typeof filters.status)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* LEFT: Projects */}
        <div className="space-y-4">
          <AddProjectForm />

          <ProjectList
            selectedProjectId={filters.projectId}
            onSelect={setProjectId}
          />
        </div>

        {/* MIDDLE: Tasks */}
        <div className="space-y-4 col-span-2">
          <AddTaskForm selectedProjectId={filters.projectId} />

          <TaskList tasks={filteredTasks} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatsCard label="Total" value={stats.total} />
        <StatsCard label="Completed" value={stats.completed} />
        <StatsCard label="Active" value={stats.active} />
      </div>

      <ProgressBar value={completionRate} />

      {/* Reset */}
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset App</button>
    </div>
  );
}
