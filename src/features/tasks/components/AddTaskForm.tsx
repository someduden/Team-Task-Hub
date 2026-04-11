import { useTasks } from '@/shared/hooks/useTasks';
import { Button } from '@/shared/components/ui/button';
import { taskSchema } from '../schema/taskSchema';
import { Input } from '@/shared/components/ui/input';
import { useFormValidation } from '@/shared/hooks/useFormValidation';
import { useEffect } from 'react';
import type { Priority } from '@/shared/types/types';

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

  const isDisabled = !selectedProjectId;

  const { values, errors, handleChange, handleSubmit, reset } =
    useFormValidation<TaskFormValues>(
      taskSchema,
      {
        title: '',
        projectId: selectedProjectId ?? 'default',
        priority: 'medium',
      },
      (validData) => {
        if (!selectedProjectId) return;

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex gap-3">
        {!selectedProjectId && (
          <p className="text-sm text-gray-400">
            Select a project to add a task
          </p>
        )}
        <Input
          value={values.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="New task..."
          disabled={isDisabled}
        />
        <Button type="submit" disabled={isDisabled}>
          Add
        </Button>
      </div>

      <div className="flex justify-center gap-3">
        <p>Assign Priority:</p>
        <select
          value={values.priority}
          onChange={(e) => handleChange('priority', e.target.value as Priority)}
          disabled={isDisabled}
          className="border px-2 py-1 rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
    </form>
  );
}

export default AddTaskForm;
