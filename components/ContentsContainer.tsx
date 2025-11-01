"use client";

import { PostDetail } from "@/hooks/useContents";
import MarkdownContainer from "./MarkdownContainer";
import { useState, useEffect } from "react";

export default function ContentsContainer({
  selectedContent,
}: {
  selectedContent: PostDetail | string;
}) {
  const [containerWidth, setContainerWidth] = useState(600); // 기본값 600px
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      // SideBar의 왼쪽 목록 영역 너비 (min-w-52 = 208px)
      const sidebarListWidth = 208;
      const mouseX = e.clientX;

      // ContentsContainer의 새로운 너비 계산
      // 마우스 X 좌표에서 SideBar 목록 너비를 빼면 ContentsContainer의 오른쪽 끝 위치
      const newWidth = mouseX - sidebarListWidth;

      const minWidth = 300;
      const maxWidth = window.innerWidth - sidebarListWidth - 300; // 최소한의 여백 확보

      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setContainerWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing]);

  return (
    <div className="flex h-full">
      {/* 컨텐츠 영역 */}
      <div
        className="overflow-y-auto p-4 h-full flex-shrink-0"
        style={{ width: `${containerWidth}px` }}
      >
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
      </div>

      {/* 드래그 핸들 (오른쪽 끝) */}
      <div
        className="flex-shrink-0 relative group"
        onMouseDown={(e) => {
          e.preventDefault();
          setIsResizing(true);
        }}
      >
        {/* 실제 보이는 핸들 */}
        {/* <div className="w-[1px] bg-gray-600 hover:bg-blue-500 cursor-col-resize transition-colors h-full" /> */}
        {/* 더 넓은 드래그 영역 */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 cursor-col-resize" />
      </div>
    </div>
  );
}
