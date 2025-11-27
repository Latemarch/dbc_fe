"use client";

import { ContentsResponse, PostDetail } from "@/hooks/useContents";
import * as React from "react";
import { FiSidebar } from "react-icons/fi";
import MobileContentsContainer from "./MobileContentsContainer";

export default function MobileHeader({
  setSelectedContent,
  selectedContent,
  contents,
  content,
}: {
  setSelectedContent: React.Dispatch<React.SetStateAction<string | null>>;
  selectedContent: string | null;
  contents: ContentsResponse;
  content: string | PostDetail | null;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div
      className={`fixed flex-row w-full z-50 drop-shadow-lg bg-sidebar flex-shrink-0 ${
        isSidebarOpen ? "bg-sidebar h-dvh" : ""
      }`}
    >
      <div className="flex flex-col h-full p-1">
        <div className="flex justify-between items-center ">
          {isSidebarOpen && (
            <span className="font-bold text-xl ">References</span>
          )}
          {selectedContent && content && (
            <MobileContentsContainer
              selectedContent={content}
              setSelectedContent={setSelectedContent}
            />
          )}
          <div
            className="cursor-pointer h-8 flex items-center justify-center"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FiSidebar className="text-xl" />
          </div>
        </div>
        {isSidebarOpen && (
          <div className="flex flex-col h-full">
            <h2
              className="font-bold text-lg my-2 cursor-pointer hover:text-white"
              onClick={() =>
                setSelectedContent((prev) =>
                  prev === "resume" ? null : "resume"
                )
              }
            >
              Resume
            </h2>
            <div className="border-t border-gray-500 my-2" />
            <h2 className="font-bold text-lg my-2">Posts</h2>
            {contents && (
              <div className="flex flex-col gap-2">
                {Object.entries(contents.posts.posts_list).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="text-sm text-gray-300 hover:text-white cursor-pointer"
                      style={
                        selectedContent === key ? { color: "#00aaff" } : {}
                      }
                      onClick={() =>
                        setSelectedContent((prev) =>
                          prev === value.id ? null : value.id
                        )
                      }
                    >
                      {value.title}
                    </div>
                  )
                )}
              </div>
            )}
            <div className="border-t border-gray-500 my-2" />
            <h2 className="font-bold text-lg my-2">Projects</h2>
            {contents && (
              <div className="flex flex-col gap-2">
                {Object.entries(contents.projects).map(([key, value]) => (
                  <div
                    key={key}
                    className="text-sm text-gray-300 hover:text-white cursor-pointer"
                  >
                    {value.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {/* {selectedContent && contents && (
        <ContentsContainer
          selectedContent={contents.posts[selectedContent] as PostDetail}
        />
      )} */}
      {/* {selectedContent && content && (
        <MobileContentsContainer
          selectedContent={content}
          setSelectedContent={setSelectedContent}
        />
      )} */}
    </div>
  );
}
