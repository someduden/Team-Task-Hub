import { projectSchema } from '@/features/projects/schema/projectSchema';
import { taskSchema } from '@/features/tasks/schema/taskSchema';
import { useState } from 'react';
import type { ZodSchema } from 'zod';

type Errors<T> = Partial<Record<keyof T, string>>;

export function useFormValidation<T>(
  schema: ZodSchema<T>,
  initialValues: T,
  onSubmit: (values: T) => void,
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({});

  function handleChange<K extends keyof T>(key: K, value: T[K]) {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function validate(): boolean {
    const result = schema.safeParse(values);

    if (result.success) {
      setErrors({});
      return true;
    }

    const fieldErrors: Errors<T> = {};

    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof T;
      fieldErrors[field] = issue.message;
    });

    setErrors(fieldErrors);
    return false;
  }

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(values);
  }

  function reset() {
    setValues(initialValues);
    setErrors({});
  }

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    reset,
  };
}

export const editTaskSchema = taskSchema.pick({
  title: true,
});

export const editProjectSchema = projectSchema;
