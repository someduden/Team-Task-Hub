import { useTasks } from '@/hooks/useTasks';
import ProjectItem from './ProjectItem';

type Props = {
  selectedProjectId: string | null;
  onSelect: (id: string | null) => void;
};

function ProjectList({ selectedProjectId, onSelect }: Props) {
  const { state } = useTasks();

  return (
    <div>
      {state.projects.map((project) => (
        <ProjectItem
          key={project.id}
          project={project}
          isSelected={selectedProjectId === project.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default ProjectList;
