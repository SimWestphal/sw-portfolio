import { sanityFetch } from "@/sanity/live";
import { PROJECTS_QUERY } from "@/sanity/queries";
import { notFound } from "next/navigation";
import { ProjectsList } from "./ProjectsList";

export async function ProjectsData({ locale }: { locale: string }) {
  //"use cache";

  const { data: projects } = await sanityFetch({
    query: PROJECTS_QUERY,
    params: { language: locale },
  });

  if (!projects) notFound();

  return <ProjectsList projects={projects} />;
}
