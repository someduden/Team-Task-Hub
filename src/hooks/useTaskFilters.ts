import type { TaskFilters } from '@/types/filters';
import type { Task } from '@/types/types';
import { useMemo } from 'react';

const priorityOrder = {
  high: 0,
  medium: 1,
  low: 2,
};

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
        if (filters.priority === 'all') return true;
        return task.priority === filters.priority;
      })
      .filter((task) => {
        return task.title.toLowerCase().includes(filters.search.toLowerCase());
      })
      .sort((a, b) => {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
  }, [tasks, filters]);

  const stats = useMemo(() => {
    const total = filteredTasks.length;
    const completed = filteredTasks.filter((t) => t.completed).length;
    const active = total - completed;

    return { total, completed, active };
  }, [filteredTasks]);

  return {
    filteredTasks,
    stats,
  };
}
