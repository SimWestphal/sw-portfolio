import getCleanedChunkAnchor from "@/app/lib/getCleanedChunkAnchor";
import { getFormattedNumber, getProjectDuration } from "@/app/lib/helpers";
import { tv } from "@/app/lib/tv";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { PROJECTS_QUERY_RESULT } from "../../../../sanity.types";
import { Modal } from "../Modal";
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
    headingNumber: "font-mono text-content-faint text-medium pt-1",
    headingText: "text-h3 transition-smooth group-hover:text-accent",
    additionalInfo: "gap-2 flex flex-wrap items-center text-content-muted",
    projectTime: "text-medium font-mono text-content-muted",
    projectCategory: "text-medium font-mono",
    projectCompany:
      "border-1  font-mono text-small uppercase px-2 py-[2px] pb-0 border-accent-tint-border bg-accent-tint text-accent-tag",
    shortDescription: "text-p text-content-body",
    readMoreLink: "group/readmore block",
    readMore: "inline-block px-2 group-hover/readmore:text-accent text-xl",
  },
});

export function ProjectCard({ project, number }: ProjectCardProps) {
  if (!project) return null;

  const formattedChunkAnchor = getCleanedChunkAnchor({
    arrayOfStrings: [project.name, project.company],
  });

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
    readMoreLink,
    readMore,
  } = projectCardStyles({});
  const linki = `?projekt-${formattedChunkAnchor}=true`;
  return (
    <article id={formattedChunkAnchor} className={wrapper()}>
      <div className={heading()}>
        <span className={headingNumber()}>{getFormattedNumber(number)}</span>
        <h3 className={headingText()}>{project.projectCategory}</h3>
      </div>
      <div className={additionalInfo()}>
        <span className={projectTime()}>
          {getProjectDuration(project.projectStart, project.projectEnd)}
        </span>
        <span>|</span>
        <span className={projectCategory()}>{project.name}</span>
        <span className={projectCompany()}>{project.company}</span>
        {/* TODO anonymisiert feld + fe */}
      </div>
      <p className={shortDescription()}>
        <Link href={linki} className={readMoreLink()}>
          {project.shortDescription}
          <span className={readMore()}>+</span>
        </Link>
      </p>
      <TagList
        list={project.skills}
        showHeader={false}
        headerId={`skills-${project.company}`}
        header="Skills"
      />

      <Modal
        number={getFormattedNumber(number)}
        project={project}
        id={`projekt-${formattedChunkAnchor}`}
        descSr="Ausführliche Projektbeschreibung"
      >
        <PortableText value={project.description} />
      </Modal>
    </article>
  );
}
