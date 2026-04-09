import { useTasks } from '@/hooks/useTasks';
import ProjectItem from './ProjectItem';
import { Button } from '@/shared/components/ui/button';

type Props = {
  selectedProjectId: string | null;
  onSelect: (id: string | null) => void;
};

function ProjectList({ selectedProjectId, onSelect }: Props) {
  const { state } = useTasks();

  return (
    <div className="flex flex-col gap-1">
      <Button
        onClick={() => onSelect(null)}
        className={`text-left px-2 py-1 rounded ${
          !selectedProjectId ? 'bg-blue-950' : 'hover:bg-blue-800'
        }`}
      >
        All Tasks
      </Button>

      {state.projects.map((project) => (
        <Button
          key={project.id}
          onClick={() => onSelect(project.id)}
          className={`text-left px-2 py-1 rounded ${
            selectedProjectId === project.id
              ? 'bg-blue-950'
              : 'hover:bg-blue-900'
          }`}
        >
          {project.name}
        </Button>
      ))}
    </div>
  );
}

export default ProjectList;
