import { Button } from '@/shared/components/ui/button';
import { useState } from 'react';
import ProjectEditForm from './ProjectEditForm';
import type { Project } from '@/shared/types/types';

type Props = {
  project: Project;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
};

function ProjectItem({ project, isSelected, onSelect }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    <ProjectEditForm
      project={project}
      onCancel={() => setIsEditing(false)}
      onSave={() => setIsEditing(false)}
    />;
  }

  return (
    <div>
      <Button
        variant={'outline'}
        onClick={() => onSelect(project.id)}
        style={{ fontWeight: isSelected ? 'bold' : 'normal' }}
      >
        {project.name}
      </Button>

      <Button onClick={() => setIsEditing(true)}>Edit</Button>
    </div>
  );
}

export default ProjectItem;
