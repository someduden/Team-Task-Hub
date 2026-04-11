import { useFormValidation } from '@/shared/hooks/useFormValidation';
import { useTasks } from '@/shared/hooks/useTasks';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { projectSchema } from '../schema/projectSchema';

function AddProjectForm() {
  const { dispatch } = useTasks();

  const { values, errors, handleChange, handleSubmit, reset } =
    useFormValidation(projectSchema, { name: '' }, (validData) => {
      dispatch({
        type: 'ADD_PROJECT',
        payload: {
          id: crypto.randomUUID(),
          name: validData.name,
        },
      });

      reset();
    });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-1.5">
      <Input
        value={values.name}
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder="New project..."
      />

      {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

      <Button type="submit" variant={'outline'}>
        Add Project
      </Button>
    </form>
  );
}

export default AddProjectForm;
