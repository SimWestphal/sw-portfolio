import { ProjectsData } from "./ProjectsData";

type ProjectsProps = {
  locale: string;
};
export default async function Projects({ locale }: ProjectsProps) {
  return <ProjectsData locale={locale} />;
}
