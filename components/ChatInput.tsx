"use client";

import { useState, FormEvent, KeyboardEvent } from "react";

interface ChatInputProps {
  onSubmit?: (message: string) => void;
}

export default function ChatInput({ onSubmit }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    console.log("메시지 전송:", message);
    onSubmit?.(message);
    setMessage("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        console.log("메시지 전송:", message);
        onSubmit?.(message);
        setMessage("");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-2 items-center dark:border-gray-700"
    >
      <div className="flex gap-1 bg-[#303030]">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요... (Shift+Enter로 줄바꿈)"
            className="w-full px-4 h-12 p-2 scrollbar-hide dark:border-gray-600 rounded-lg drop-shadow-lg 
                     bg-[#303030] dark:bg-chat text-gray-900 dark:text-gray-100
                     placeholder-gray-400 dark:placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     resize-none max-h-32 overflow-y-auto"
            rows={1}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-400 dark:text-gray-500">
            Shift+Enter: 줄바꿈
          </div>
        </div>
        <button
          type="submit"
          disabled={!message.trim()}
          className=" bg-blue-600 hover:bg-blue-700 
                   disabled:bg-gray-300 dark:disabled:bg-gray-600
                   disabled:cursor-not-allowed
                   text-white rounded-lg transition-colors h-12
                   flex items-center justify-center min-w-12"
        ></button>
      </div>
    </form>
  );
}
