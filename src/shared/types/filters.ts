export type StatusFilter = 'all' | 'active' | 'completed';
export type Priority = 'low' | 'medium' | 'high';

export type TaskFilters = {
  search: string;
  status: StatusFilter;
  projectId: string | null;
  priority: Priority | 'all';
};
