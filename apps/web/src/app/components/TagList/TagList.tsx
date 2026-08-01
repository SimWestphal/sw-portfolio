import { tv } from "@/app/lib/tv";

interface TagListProps {
  list: TagItemProps[];
}
interface TagItemProps {
  name: string;
  _id: string;
}

const tagStyles = tv({
  slots: {
    tagList: "flex gap-2 flex-wrap",
    tag: "text-langswitch px-2 py-0 border-1 border-content-subtle inline text-nowrap",
  },
});

export function Tag({ name }: TagItemProps) {
  if (!name) return null;
  const { tag } = tagStyles();

  return <span className={tag()}>{name}</span>;
}

export function TagList({ list }: TagListProps) {
  const { tagList } = tagStyles();
  const renderedList = list.map((item) => {
    return (
      <li key={item._id} className={tagList()}>
        <Tag name={item.name ?? ""} />
      </li>
    );
  });

  return <ul className={tagList()}>{renderedList}</ul>;
}
