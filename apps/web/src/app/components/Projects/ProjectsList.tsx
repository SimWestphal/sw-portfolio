import { PROJECTS_QUERY_RESULT } from "../../../../sanity.types";
import { ProjectCard } from "./ProjectCard";

export function ProjectsList({
  projects,
}: {
  projects: PROJECTS_QUERY_RESULT;
}) {
  const renderedProjects = projects.map((project, i) => {
    return (
      <li key={project._id}>
        <ProjectCard project={project} number={i} />
      </li>
    );
  });

  return <ul id="projects">{renderedProjects}</ul>;
}
