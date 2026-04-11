import { useTaskFilters } from '@/shared/hooks/useTaskFilters';
import { useTasks } from '@/shared/hooks/useTasks';
import { StatsCard } from './StatsCard';
import { ProgressBar } from './ProgressBar';
import { useTaskFilterState } from '@/shared/hooks/useTaskFilterState';
import AddTaskForm from '@/features/tasks/components/AddTaskForm';
import TaskList from '@/features/tasks/components/TaskList';
import { Button } from '@/shared/components/ui/button';
import AddProjectForm from '@/features/projects/components/AddProjectForm';
import ProjectList from '@/features/projects/components/ProjectList';

export function Dashboard() {
  const { state, dispatch } = useTasks();

  const { filters, setSearch, setStatus, setPriority, setProjectId } =
    useTaskFilterState();

  const { filteredTasks, stats } = useTaskFilters(state.tasks, filters);

  const completionRate =
    stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

  return (
    <div className="flex h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 border-r p-4 flex flex-col gap-4 bg-gray-50">
        <h2 className="text-lg font-semibold">Projects</h2>

        <AddProjectForm />

        <ProjectList
          selectedProjectId={filters.projectId}
          onSelect={setProjectId}
        />
      </aside>

      {/* MAIN PANEL */}
      <main className="flex-1 p-6 flex flex-col gap-6">
        <div className="flex justify-between items-center flex-col">
          <h1 className="text-2xl font-bold">Tasks</h1>

          <div className="flex gap-2">
            <input
              value={filters.search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="px-2 py-1 border rounded"
            />

            <select
              value={filters.status}
              onChange={(e) =>
                setStatus(e.target.value as typeof filters.status)
              }
              className="px-2 py-1 border rounded"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={filters.priority}
              onChange={(e) =>
                setPriority(e.target.value as typeof filters.priority)
              }
              className="px-2 py-1 border rounded"
            >
              <option value="all">All priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <AddTaskForm selectedProjectId={filters.projectId} />

        <TaskList tasks={filteredTasks} />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <StatsCard label="Total" value={stats.total} />
          <StatsCard label="Completed" value={stats.completed} />
          <StatsCard label="Active" value={stats.active} />
        </div>

        <ProgressBar value={completionRate} />

        <Button onClick={() => dispatch({ type: 'RESET' })}>Reset App</Button>
      </main>
    </div>
  );
}
