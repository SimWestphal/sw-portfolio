import { sanityFetch } from "@/sanity/live";
import { defineQuery } from "next-sanity";

const SKILLS_QUERY = defineQuery(`*[_type == "skill"]|order(_createdAt asc){
  _id,
  "name": coalesce(
    name[language == $locale][0].value,
    name[language == "de"][0].value
  )
}`);

export default async function IndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { data: skills } = await sanityFetch({
    query: SKILLS_QUERY,
    params: { locale },
  });

  return (
    <main className="flex min-h-screen flex-col p-24 gap-12">
      <h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-white">
        Events
      </h1>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {skills.map((skill) => (
          <li
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm dark:shadow-gray-900/20"
            key={skill._id}
          >
            {skill.name}
          </li>
        ))}
      </ul>
    </main>
  );
}
