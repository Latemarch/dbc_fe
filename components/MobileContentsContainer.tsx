"use client";

import { PostDetail } from "@/hooks/useContents";
import MarkdownContainer from "./MarkdownContainer";
import { BiLeftArrowAlt } from "react-icons/bi";

export default function MobileContentsContainer({
  selectedContent,
  setSelectedContent,
}: {
  selectedContent: PostDetail | string;
  setSelectedContent: (content: string | null) => void;
}) {
  return (
    <div className="absolute z-50 inset-0 bg-sidebar">
      {/* 컨텐츠 영역 */}
      <div className="overflow-y-auto h-full w-full p-4 pb-20">
        <div className="flex flex-row w-full justify-end items-center">
          <div
            onClick={() => setSelectedContent(null)}
            className="text-xl text-gray-300 hover:text-white cursor-pointer m-2"
          >
            <BiLeftArrowAlt />
          </div>
        </div>
        {typeof selectedContent !== "string" && (
          <MarkdownContainer content={"# " + selectedContent.title} />
        )}

        <MarkdownContainer
          content={
            typeof selectedContent === "string"
              ? selectedContent
              : selectedContent.body
          }
        />
        <div
          onClick={() => setSelectedContent(null)}
          className="flex justify-end items-end mt-16 bottom-2 right-2 font-bold text-xl text-gray-300 hover:text-white cursor-pointer m-2"
        >
          close
        </div>
      </div>
    </div>
  );
}
