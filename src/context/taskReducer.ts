import type { Project, Task } from '../types/types';

export type State = {
  tasks: Task[];
  projects: Project[];
};

export type Action =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'TOGGLE_TASK'; payload: { id: string } }
  | { type: 'DELETE_TASK'; payload: { id: string } }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_TASK'; payload: { id: string; title: string } }
  | { type: 'UPDATE_PROJECT'; payload: { id: string; name: string } }
  | { type: 'RESET' };

export const initialState: State = {
  tasks: [],
  projects: [],
};

export function taskReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, completed: !task.completed }
            : task,
        ),
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };

    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, title: action.payload.title }
            : task,
        ),
      };

    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.id
            ? { ...project, name: action.payload.name }
            : project,
        ),
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}
