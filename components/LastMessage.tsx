"use client";

import MarkdownContainer from "./MarkdownContainer";

export default function LastMessage({ lastMessage }: { lastMessage: string }) {
  console.log(lastMessage);

  return <MarkdownContainer content={lastMessage} />;
}
