import z from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'Task cannot be empty').max(100, 'Task too long'),
  projectId: z.string(),
  priority: z.enum(['low', 'medium', 'high']),
});
