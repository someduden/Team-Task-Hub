import { TaskContext } from '@/context/TaskContext';
import { useContext } from 'react';

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used withing TaskProvider');
  }
  return context;
}
