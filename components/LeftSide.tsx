"use client";

import { PostDetail, useContentsData } from "@/hooks/useContents";
import ContentsContainer from "./ContentsContainer";
import SideBar from "./SideBar";
import * as React from "react";

export default function LeftSide() {
  const [selectedContent, setSelectedContent] = React.useState<string | null>(
    null
  );
  const [content, setContent] = React.useState<string | PostDetail | null>(
    null
  );
  const { data: contents } = useContentsData();

  React.useEffect(() => {
    if (selectedContent && contents) {
      if (selectedContent === "resume") {
        setContent(contents.resume);
      } else {
        setContent(contents.posts[selectedContent] as PostDetail);
      }
    }
  }, [selectedContent, contents]);
  if (!contents) return null;
  return (
    <div className="flex h-full min-w-52 flex-row flex-shrink-0">
      <SideBar
        setSelectedContent={setSelectedContent}
        selectedContent={selectedContent}
        contents={contents}
      />
      {content && selectedContent && (
        <ContentsContainer
          selectedContent={content}
          setSelectedContent={setSelectedContent}
        />
      )}
    </div>
  );
}
