import z from 'zod';

export const projectSchema = z.object({
  name: z
    .string()
    .min(1, 'Project name required')
    .max(50, 'Project name too long'),
});
