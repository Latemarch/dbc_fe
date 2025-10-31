import { PostDetail, PostSummary } from "@/hooks/useContents";
import MarkdownContainer from "./MarkdownContainer";

export default function ContentsContainer({
  selectedContent,
}: {
  selectedContent: PostDetail | { [key: string]: PostSummary };
}) {
  const content = (selectedContent as PostDetail)?.body ?? "";
  const title = (selectedContent as PostDetail)?.title ?? "";
  return (
    <div className="overflow-y-auto p-4 max-w-4xl ">
      <MarkdownContainer content={"# " + title} />
      <MarkdownContainer content={content} />
    </div>
  );
}
