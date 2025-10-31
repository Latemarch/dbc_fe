import { PostDetail } from "@/hooks/useContents";
import MarkdownContainer from "./MarkdownContainer";

export default function ContentsContainer({
  selectedContent,
}: {
  selectedContent: PostDetail;
}) {
  const content = selectedContent?.body ?? "";
  const title = selectedContent.title ?? "";
  return (
    <div className="overflow-y-auto p-4 max-w-4xl ">
      <MarkdownContainer content={"# " + title} />
      <MarkdownContainer content={content} />
    </div>
  );
}
