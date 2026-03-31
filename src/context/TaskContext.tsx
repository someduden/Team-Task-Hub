import { createContext, useEffect, useReducer, type ReactNode } from 'react';
import {
  initialState,
  taskReducer,
  type Action,
  type State,
} from './taskReducer';
import { useLocalStorage } from '@/hooks/useLocalStorage';

type TaskContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined,
);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [storedState, setStoredState] = useLocalStorage<State>(
    'task-app',
    initialState,
  );

  const [state, dispatch] = useReducer(
    taskReducer,
    storedState,
    (initial) => initial,
  );

  useEffect(() => {
    setStoredState(state);
  }, [state, setStoredState]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
