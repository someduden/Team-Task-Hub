import {
  type Priority,
  type StatusFilter,
  type TaskFilters,
} from '@/types/filters';
import { useState } from 'react';

export function useTaskFilterState(initial?: Partial<TaskFilters>) {
  const [search, setSearch] = useState(initial?.search ?? '');
  const [status, setStatus] = useState<StatusFilter>(initial?.status ?? 'all');
  const [priority, setPriority] = useState<Priority | 'all'>(
    initial?.priority ?? 'all',
  );
  const [projectId, setProjectId] = useState<string | null>(
    initial?.projectId ?? null,
  );

  const filters: TaskFilters = {
    search,
    status,
    projectId,
    priority,
  };

  const resetFilters = () => {
    setSearch('');
    setStatus('all');
    setPriority('all');
    setProjectId(null);
  };

  return {
    filters,
    search,
    status,
    projectId,
    setSearch,
    setPriority,
    setStatus,
    setProjectId,
    resetFilters,
  };
}
