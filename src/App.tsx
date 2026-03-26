import './App.css';
import { useTasks } from './context/TaskContext';

function App() {
  const { state, dispatch } = useTasks();

  return (
    <div>
      <h1>Tasks: {state.tasks.length}</h1>

      <button
        onClick={() =>
          dispatch({
            type: 'ADD_TASK',
            payload: {
              id: crypto.randomUUID(),
              title: 'my first task',
              completed: false,
              projectId: 'default',
            },
          })
        }
      >
        Add Task
      </button>
    </div>
  );
}

export default App;
