import type { Project, Task } from "../types/types";

export type State = {
    tasks: Task[];
    projects: Project[];
}

export type Action =
    | { type: "ADD_TASK"; payload: Task }
    | { type: "TOGGLE_TASK"; payload: { id: string } }
    | { type: "DELETE_TASK"; payload: { id: string } }
    | { type: "ADD_PROJECT"; payload: Project };

export const initialState: State = {
    tasks: [],
    projects: [],
};

export function taskReducer(state: State, action: Action): State {
    switch (action.type) {
        case "ADD_TASK":
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };
        
        case "TOGGLE_TASK":
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                task.id === action.payload.id
                    ? { ...task, completed: !task.completed }
                    : task
                ),
            };

        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter(
                    (task) => task.id !== action.payload.id
                ),
            };

        case "ADD_PROJECT":
            return {
                ...state,
                projects: [...state.projects, action.payload],
            };

        default:
            return state;
    }
}