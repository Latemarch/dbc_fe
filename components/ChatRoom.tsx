"use client";
import ChatInput from "./ChatInput";

export default function ChatRoom() {
  return (
    <div className="flex flex-col h-full max-w-4xl min-w-40 w-full">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="text-gray-500 dark:text-gray-400">
          대화 내용이 여기에 표시됩니다...
        </div>
      </div>
      <ChatInput />
    </div>
  );
}
