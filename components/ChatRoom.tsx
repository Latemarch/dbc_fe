"use client";
import ChatInput from "./ChatInput";
import * as React from "react";
import LastMessage from "./LastMessage";
import { sendChatMessage } from "@/libs/chatService";

export default function ChatRoom() {
  const [reply, setReply] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onSubmit = async (message: string) => {
    if (!message.trim() || isLoading) return;

    await sendChatMessage(message, "123", {
      onStart: () => {
        setIsLoading(true);
        setReply("");
      },
      onUpdate: (text: string) => {
        setReply(text);
      },
      onError: (error: string) => {
        setReply(error);
      },
      onComplete: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <div className="flex flex-col h-full max-w-4xl min-w-40 w-full">
      <div className="flex-1 overflow-y-auto p-4">
        <LastMessage lastMessage={reply} />
      </div>
      <ChatInput onSubmit={onSubmit} disabled={isLoading} />
    </div>
  );
}
