import { useTasks } from '@/hooks/useTasks';
import { Button } from '@/shared/components/ui/button';
import { taskSchema } from '../schema/taskSchema';
import { Input } from '@/shared/components/ui/input';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useEffect } from 'react';

type Props = {
  selectedProjectId: string | null;
};

function AddTaskForm({ selectedProjectId }: Props) {
  const { dispatch } = useTasks();

  const { values, errors, handleChange, handleSubmit, reset } =
    useFormValidation(
      taskSchema,
      {
        title: '',
        projectId: selectedProjectId ?? 'default',
      },
      (validData) => {
        dispatch({
          type: 'ADD_TASK',
          payload: {
            id: crypto.randomUUID(),
            title: validData.title,
            completed: false,
            projectId: validData.projectId,
          },
        });

        reset();
      },
    );

  useEffect(() => {
    handleChange('projectId', selectedProjectId ?? 'default');
  }, [selectedProjectId, handleChange]);

  return (
    <form onSubmit={handleSubmit}>
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
