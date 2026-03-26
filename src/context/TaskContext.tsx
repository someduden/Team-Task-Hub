import { createContext, useContext, useReducer, type ReactNode } from 'react';
import {
  initialState,
  taskReducer,
  type Action,
  type State,
} from './taskReducer';

type TaskContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used withing TaskProvider');
  }
  return context;
}
