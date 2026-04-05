import type { StatusFilter, TaskFilters } from '@/types/filters';
import { useState } from 'react';

export function useTaskFilterState(initial?: Partial<TaskFilters>) {
  const [search, setSearch] = useState(initial?.search ?? '');
  const [status, setStatus] = useState<StatusFilter>(initial?.status ?? 'all');
  const [projectId, setProjectId] = useState<string | null>(
    initial?.projectId ?? null,
  );

  const filters: TaskFilters = {
    search,
    status,
    projectId,
  };

  const resetFilters = () => {
    setSearch('');
    setStatus('all');
    setProjectId(null);
  };

  return {
    filters,
    search,
    status,
    projectId,
    setSearch,
    setStatus,
    setProjectId,
    resetFilters,
  };
}
