"use client";

import { PostDetail } from "@/hooks/useContents";
import MarkdownContainer from "./MarkdownContainer";
import { useState, useEffect, useRef } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";

export default function ContentsContainer({
  selectedContent,
  setSelectedContent,
}: {
  selectedContent: PostDetail | string;
  setSelectedContent: (content: string | null) => void;
}) {
  const [containerWidth, setContainerWidth] = useState(600); // 기본값 600px
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startLeftRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      const mouseX = e.clientX;
      // 컨테이너의 왼쪽 시작점에서 마우스 위치까지의 거리 = 새로운 너비
      const newWidth = mouseX - startLeftRef.current;

      const minWidth = 300;
      const maxWidth = window.innerWidth - startLeftRef.current - 300; // 최소한의 여백 확보

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

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (containerRef.current) {
      // 리사이징 시작 시 컨테이너의 왼쪽 시작점 저장
      const rect = containerRef.current.getBoundingClientRect();
      startLeftRef.current = rect.left;
      setIsResizing(true);
    }
  };

  return (
    <div className="flex h-full p-4">
      {/* 컨텐츠 영역 */}
      <div
        ref={containerRef}
        className="overflow-y-auto h-full flex-shrink-0"
        style={{ width: `${containerWidth}px` }}
      >
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
      </div>

      {/* 드래그 핸들 (오른쪽 끝) */}
      <div
        className="flex-shrink-0 relative group"
        onMouseDown={handleMouseDown}
      >
        {/* 실제 보이는 핸들 */}
        {/* <div className="w-[1px] bg-gray-600 hover:bg-blue-500 cursor-col-resize transition-colors h-full" /> */}
        {/* 더 넓은 드래그 영역 */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 cursor-col-resize" />
      </div>
    </div>
  );
}
