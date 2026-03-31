export type StatusFilter = 'all' | 'active' | 'completed';

export type TaskFilters = {
  search: string;
  status: StatusFilter;
  projectId: string | null;
};
