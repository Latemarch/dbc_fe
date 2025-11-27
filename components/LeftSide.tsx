"use client";

import { PostDetail, useContentsData } from "@/hooks/useContents";
import ContentsContainer from "./ContentsContainer";
import SideBar from "./SideBar";
import * as React from "react";
import MobileHeader from "./MobileHeader";
import MobileContentsContainer from "./MobileContentsContainer";

export default function LeftSide() {
  const [selectedContent, setSelectedContent] = React.useState<string | null>(
    null
  );
  const [isDesktop, setIsDesktop] = React.useState(false);
  const [content, setContent] = React.useState<string | PostDetail | null>(
    null
  );
  const { data: contents } = useContentsData();
  // 미디어 쿼리: md 이상 (768px)일 때 데스크톱으로 간주
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    };

    // 초기 체크
    checkScreenSize();

    // 리사이즈 이벤트 리스너 추가
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    // MediaQueryList.addEventListener (최신 브라우저)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // 구형 브라우저 지원
      mediaQuery.addListener(handleChange);
    }

    // 리사이즈 이벤트도 추가 (추가 안전장치)
    window.addEventListener("resize", checkScreenSize);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

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
    <div
      className={`flex h-full ${
        isDesktop ? "min-w-52" : ""
      } flex-row flex-shrink-0`}
    >
      {isDesktop ? (
        <SideBar
          setSelectedContent={setSelectedContent}
          selectedContent={selectedContent}
          contents={contents}
        />
      ) : (
        <MobileHeader
          setSelectedContent={setSelectedContent}
          selectedContent={selectedContent}
          contents={contents}
          content={content}
        />
      )}
      {content && selectedContent && isDesktop && (
        <ContentsContainer
          selectedContent={content}
          setSelectedContent={setSelectedContent}
        />
      )}
      {/* {content && selectedContent && !isDesktop && (
        <MobileContentsContainer
          selectedContent={content}
          setSelectedContent={setSelectedContent}
        />
      )} */}
    </div>
  );
}
