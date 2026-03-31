import {
  editProjectSchema,
  useFormValidation,
} from '@/hooks/useFormValidation';
import { useTasks } from '@/hooks/useTasks';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import type { Project } from '@/types/types';

type Props = {
  project: Project;
  onCancel: () => void;
  onSave: () => void;
};

function ProjectEditForm({ project, onCancel, onSave }: Props) {
  const { dispatch } = useTasks();

  const { values, errors, handleChange, handleSubmit } = useFormValidation(
    editProjectSchema,
    { name: project.name },
    (validData) => {
      dispatch({
        type: 'UPDATE_PROJECT',
        payload: {
          id: project.id,
          name: validData.name,
        },
      });

      onSave();
    },
  );

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={values.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />

      {errors.name && <p>{errors.name}</p>}

      <Button type="submit">Save</Button>
      <Button type="button" onClick={onCancel}>
        Cancel
      </Button>
    </form>
  );
}

export default ProjectEditForm;
