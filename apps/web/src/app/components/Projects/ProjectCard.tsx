import generateChunkAnchor from "@/app/lib/generateChunkAnchor";
import { tv } from "@/app/lib/tv";
import { PortableText } from "next-sanity";
import { PROJECTS_QUERY_RESULT } from "../../../../sanity.types";
import { TagList } from "../TagList";

type Project = PROJECTS_QUERY_RESULT[number];

type ProjectCardProps = {
  project: Project;
  number: number;
};

const projectCardStyles = tv({
  slots: {
    wrapper:
      "group flex flex-col border-y border-content-subtle py-8 gap-y-4 cursor-pointer hover:translate-x-[8px] transition-very-smooth",
    heading: "flex items-center gap-4",
    headingNumber: "font-mono text-content-faint text-medium",
    headingText: "text-h3 transition-smooth group-hover:text-accent",
    additionalInfo: "",
    projectTime: "text-medium font-mono text-content-muted",
    projectCategory: "text-medium font-mono",
    projectCompany: "",
    shortDescription: "text-p text-content-body",
    readMore: "",
  },
});

function getProjectDuration(start: string | null, end: string | null) {
  if (start && end) {
    return `${start}-${end}`;
  } else return `seit ${start}` || "";
  // TODO translate
}

export function ProjectCard({ project, number }: ProjectCardProps) {
  if (!project) return null;
  const formattedNumber = String(number).padStart(2, "0");
  const chunkAnchor = [project.name, project.company].filter(Boolean).join("-");
  const formattedChunkAnchor = generateChunkAnchor({ chunkAnchor });
  const projectDuration = getProjectDuration(
    project.projectStart,
    project.projectEnd,
  );
  const {
    wrapper,
    heading,
    headingNumber,
    headingText,
    additionalInfo,
    projectTime,
    projectCategory,
    projectCompany,
    shortDescription,
    readMore,
  } = projectCardStyles({});
  return (
    <article id={formattedChunkAnchor} className={wrapper()}>
      <div className={heading()}>
        <span className={headingNumber()}>{formattedNumber}</span>
        <h3 className={headingText()}>{project.projectCategory}</h3>
      </div>
      <div className={additionalInfo()}>
        <span className={projectTime()}>{projectDuration}&nbsp;|&nbsp;</span>
        <span className={projectCategory()}>{project.company}</span>
        {/* <span className={projectCompany()}>{project.company}</span> */}
        {/* TODO anonymisiert feld + fe */}
      </div>
      <p className={shortDescription()}>{project.shortDescription}</p>
      <TagList list={project.skills} />
      <PortableText value={project.description}></PortableText>
    </article>
  );
}
