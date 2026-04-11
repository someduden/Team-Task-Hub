export type Priority = 'low' | 'medium' | 'high';

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  projectId: string;
  priority: Priority;
};

export type Project = {
  id: string;
  name: string;
};
