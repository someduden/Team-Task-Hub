import { useState } from 'react';
import './App.css';
import AddTaskForm from './features/tasks/AddTaskForm';
import TaskList from './features/tasks/TaskList';
import ProjectList from './features/projects/ProjectList';
import AddProjectForm from './features/projects/AddProjectForm';
import { Button } from './shared/components/ui/button';
import { useTasks } from './hooks/useTasks';

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const { dispatch } = useTasks();

  return (
    <div className="flex flex-col gap-5">
      <h1>Team Task Hub</h1>

      <AddProjectForm />

      <ProjectList
        selectedProjectId={selectedProjectId}
        onSelect={setSelectedProjectId}
      />

      <AddTaskForm selectedProjectId={selectedProjectId} />

      <TaskList selectedProjectId={selectedProjectId} />
      <div className="flex justify-center flex-1">
        <Button onClick={() => dispatch({ type: 'RESET' })}>Reset</Button>
      </div>
    </div>
  );
}

export default App;
