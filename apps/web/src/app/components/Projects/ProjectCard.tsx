import generateChunkAnchor from "@/app/lib/generateChunkAnchor";
import { PortableText } from "next-sanity";
import { PROJECTS_QUERY_RESULT } from "../../../../sanity.types";

type Project = PROJECTS_QUERY_RESULT[number];

type ProjectCardProps = {
  project: Project;
  number: number;
};
export function ProjectCard({ project, number }: ProjectCardProps) {
  const formattedNumber = String(number).padStart(2, "0");
  const chunkAnchor = [project.name, project.company].filter(Boolean).join("-");
  const formattedChunkAnchor = generateChunkAnchor({ chunkAnchor });
  const projectDate = [project.projectStart, project.projectEnd]
    .filter(Boolean)
    .join("-");
  console.log(project.skills);
  const renderedSkills = project?.skills?.map((skill) => {
    return <li key={skill._id}>{skill.name}</li>;
  });
  return (
    <article id={formattedChunkAnchor} className="mb-5">
      <h3>
        {formattedNumber} {project.name}
      </h3>
      <p>
        {projectDate} | {project.category} {project.company}
      </p>
      <p>{project.shortDescription}</p>
      <p>{renderedSkills}</p>
      <PortableText value={project.description}></PortableText>
    </article>
  );
}
