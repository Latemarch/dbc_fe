"use client";

import { ContentsResponse } from "@/hooks/useContents";
import * as React from "react";
import { FiSidebar } from "react-icons/fi";

export default function SideBar({
  setSelectedContent,
  selectedContent,
  contents,
}: {
  setSelectedContent: React.Dispatch<React.SetStateAction<string | null>>;
  selectedContent: string | null;
  contents: ContentsResponse;
}) {
  return (
    <div className="flex flex-row h-full flex-shrink-0">
      <div className="flex flex-col h-full p-4 bg-sidebar min-w-52 flex-shrink-0">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg my-2">Appendix</h2>
          <FiSidebar />
        </div>
        <h2
          className="font-bold text-lg my-2 cursor-pointer hover:text-white"
          onClick={() =>
            setSelectedContent((prev) => (prev === "resume" ? null : "resume"))
          }
        >
          Resume
        </h2>
        <div className="border-t border-gray-500 my-2" />
        <h2 className="font-bold text-lg my-2">Posts</h2>
        {contents && (
          <p className="flex flex-col gap-2">
            {Object.entries(contents.posts.posts_list).map(([key, value]) => (
              <div
                key={key}
                className="text-sm text-gray-300 hover:text-white cursor-pointer"
                style={selectedContent === key ? { color: "#00aaff" } : {}}
                onClick={() =>
                  setSelectedContent((prev) =>
                    prev === value.id ? null : value.id
                  )
                }
              >
                {value.title}
              </div>
            ))}
          </p>
        )}
        <div className="border-t border-gray-500 my-2" />
        <h2 className="font-bold text-lg my-2">Projects</h2>
        {contents && (
          <p className="flex flex-col gap-2">
            {Object.entries(contents.projects).map(([key, value]) => (
              <div
                key={key}
                className="text-sm text-gray-300 hover:text-white cursor-pointer"
              >
                {value.title}
              </div>
            ))}
          </p>
        )}
      </div>
      {/* {selectedContent && contents && (
        <ContentsContainer
          selectedContent={contents.posts[selectedContent] as PostDetail}
        />
      )} */}
    </div>
  );
}
