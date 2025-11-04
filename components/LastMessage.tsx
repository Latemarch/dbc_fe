"use client";

export default function LastMessage({ lastMessage }: { lastMessage: string }) {
  return <div className="text-gray-500 dark:text-gray-400">{lastMessage}</div>;
}
