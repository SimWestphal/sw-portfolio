import { tv } from "@/app/lib/tv";

interface TagListProps {
  list: TagItemProps[];
  headerId: string;
  header: string;
  showHeader?: boolean;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
}

type TagProps = {
  name: string;
};

interface TagItemProps extends TagProps {
  _id: string;
}

const tagStyles = tv({
  slots: {
    tagListHeader: "text-medium text-content-muted font-mono pb-3",
    tagList: "flex gap-2 flex-wrap ",
    tag: "text-langswitch text-content-tag  px-[10px] py-[4px] border-1 rounded-xs border-border-icon bg-tag inline text-nowrap cursor-default",
  },
  variants: {
    showHeader: {
      true: {},
      false: {
        tagListHeader: "sr-only",
      },
    },
  },
});

export function Tag({ name }: TagProps) {
  const { tag } = tagStyles();
  return <span className={tag()}>{name}</span>;
}

export function TagList({
  list,
  header,
  headerId,
  showHeader = true,
  headingLevel = 4,
}: TagListProps) {
  const Heading = `h${headingLevel}` as const;

  const visibleTags = list.filter((item) => item.name?.trim());
  if (visibleTags.length === 0) return null;

  const titleId = `${headerId.toLowerCase()}-titel`;

  const { tagList, tagListHeader } = tagStyles({ showHeader });

  return (
    <section aria-labelledby={titleId}>
      <Heading id={titleId} className={tagListHeader()}>
        {header.toUpperCase()}
      </Heading>
      <ul className={tagList()}>
        {visibleTags.map((item) => (
          <li key={item._id} className={tagList()}>
            <Tag name={item.name ?? ""} />
          </li>
        ))}
      </ul>
    </section>
  );
}
