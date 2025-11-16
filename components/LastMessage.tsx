"use client";

import MarkdownContainer from "./MarkdownContainer";

export default function LastMessage({ lastMessage }: { lastMessage: string }) {
  return <MarkdownContainer content={lastMessage} />;
}
