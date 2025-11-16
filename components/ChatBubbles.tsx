"use client";

import { Message, useConversationStore } from "@/store/converstaionStore";
import Chatbubble from "./Chatbubble";

export default function ChatBubbles() {
  const { messages } = useConversationStore();

  return (
    <div className="flex flex-col gap-2">
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
