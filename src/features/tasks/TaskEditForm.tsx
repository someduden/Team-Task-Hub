import { editTaskSchema, useFormValidation } from '@/hooks/useFormValidation';
import { useTasks } from '@/hooks/useTasks';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import type { Task } from '@/types/types';

type Props = {
  task: Task;
  onCancel: () => void;
  onSave: () => void;
};

function TaskEditForm({ task, onCancel, onSave }: Props) {
  const { dispatch } = useTasks();

  const { values, errors, handleChange, handleSubmit } = useFormValidation(
    editTaskSchema,
    { title: task.title },
    (validData) => {
      dispatch({
        type: 'UPDATE_TASK',
        payload: {
          id: task.id,
          title: validData.title,
        },
      });

      onSave();
    },
  );

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={values.title}
        onChange={(e) => handleChange('title', e.target.value)}
      />

      {errors.title && <p>{errors.title}</p>}

      <Button type="submit">Save</Button>
      <Button type="button" onClick={onCancel}>
        Cancel
      </Button>
    </form>
  );
}

export default TaskEditForm;
