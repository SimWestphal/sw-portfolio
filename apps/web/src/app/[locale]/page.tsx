export default async function IndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className="flex min-h-screen flex-col p-24 gap-12">
      <h1 className="text-4xl font-bold tracking-tighter text-gray-900 dark:text-white">
        Blocks
      </h1>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-1">
        <section id="about" className="scroll-mt-[200px] min-h-[60vh]">
          <h1>about</h1>
        </section>

        <section id="projects" className="scroll-mt-[200px] min-h-[60vh]">
          <h1>projects</h1>
        </section>

        <section id="skills" className="scroll-mt-[200px] min-h-[60vh]">
          <h1>Skills</h1>
        </section>

        <section id="stations" className="scroll-mt-[200px] min-h-[60vh]">
          <h1>Stationen</h1>
        </section>
        <section id="contact" className="scroll-mt-[200px] min-h-[80vh]">
          <h1>Kontakt</h1>
        </section>
      </ul>
    </main>
  );
}
