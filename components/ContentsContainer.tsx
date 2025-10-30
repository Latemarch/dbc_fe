import MarkdownContainer from "./MarkdownContainer";

export default function ContentsContainer({
  selectedContent,
}: {
  selectedContent: string;
}) {
  return (
    <div className="overflow-y-auto p-4 max-w-4xl ">
      <MarkdownContainer content={selectedContent ?? ""} />
    </div>
  );
}
