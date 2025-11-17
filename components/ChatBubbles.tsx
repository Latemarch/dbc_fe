"use client";

import { useConversationStore } from "@/store/converstaionStore";
import Chatbubble from "./Chatbubble";

export default function ChatBubbles() {
  const { messages } = useConversationStore();

  return (
    <div className="flex flex-col gap-2">
      {!messages.length && (
        <div className="text-sm text-gray-500 dark:text-gray-400 flex justify-center items-center h-full">
          <span>개발자에 대해 궁금한 점을 질문해 보세요.</span>
        </div>
      )}
      {messages.map((message) => (
        <div
          key={message.message}
          className={`p-1 ${
            message.role === "user" ? "self-end" : "self-start"
          }`}
        >
          <Chatbubble message={message.message} role={message.role} />
        </div>
      ))}
    </div>
  );
}
