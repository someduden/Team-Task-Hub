export type Task = {
    id: string,
    title: string,
    completed: boolean,
    projectId: string;
}

export type Project = {
    id: string,
    name: string;
}