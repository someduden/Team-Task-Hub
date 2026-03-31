import type { TaskFilters } from '@/types/filters';
import type { Task } from '@/types/types';
import { useMemo } from 'react';

export function useTaskFilters(tasks: Task[], filters: TaskFilters) {
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (filters.projectId && task.projectId !== filters.projectId) {
          return false;
        }
        return true;
      })
      .filter((task) => {
        if (filters.status === 'active') return !task.completed;
        if (filters.status === 'completed') return task.completed;
        return true;
      })
      .filter((task) => {
        return task.title.toLowerCase().includes(filters.search.toLowerCase());
      });
  }, [tasks, filters]);

  return {
    filteredTasks,
  };
}
