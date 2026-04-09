import { useTasks } from '@/hooks/useTasks';
import { Button } from '@/shared/components/ui/button';
import { taskSchema } from '../schema/taskSchema';
import { Input } from '@/shared/components/ui/input';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useEffect } from 'react';
import type { Priority } from '@/types/types';

type Props = {
  selectedProjectId: string | null;
};

type TaskFormValues = {
  title: string;
  projectId: string;
  priority: Priority;
};

function AddTaskForm({ selectedProjectId }: Props) {
  const { dispatch } = useTasks();

  const { values, errors, handleChange, handleSubmit, reset } =
    useFormValidation<TaskFormValues>(
      taskSchema,
      {
        title: '',
        projectId: selectedProjectId ?? 'default',
        priority: 'medium',
      },
      (validData) => {
        dispatch({
          type: 'ADD_TASK',
          payload: {
            id: crypto.randomUUID(),
            title: validData.title,
            completed: false,
            projectId: validData.projectId,
            priority: validData.priority,
          },
        });

        reset();
      },
    );

  useEffect(() => {
    handleChange('projectId', selectedProjectId ?? 'default');
  }, [selectedProjectId]);

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={values.priority}
        onChange={(e) => handleChange('priority', e.target.value as Priority)}
        className="border px-2 py-1 rounded"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <Input
        value={values.title}
        onChange={(e) => handleChange('title', e.target.value)}
        placeholder="New task..."
      />

      {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}

      <Button type="submit">Add</Button>
    </form>
  );
}

export default AddTaskForm;
