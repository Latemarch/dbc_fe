"use client";
import ChatInput from "./ChatInput";
import * as React from "react";
import LastMessage from "./LastMessage";
import { sendChatMessage } from "@/libs/chatService";
import { Message, useConversationStore } from "@/store/converstaionStore";
import ChatBubbles from "./ChatBubbles";
import Chatbubble from "./Chatbubble";

export default function ChatRoom() {
  const [reply, setReply] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { threadId, addMessage, setThreadId } = useConversationStore();

  // 최신 reply 값을 추적하기 위한 ref (클로저 문제 방지)
  const replyRef = React.useRef<string>("");

  // threadId 초기화 (서버 통신용)
  React.useEffect(() => {
    if (!threadId) {
      const newThreadId = crypto.randomUUID();
      setThreadId(newThreadId);
    }
  }, []);

  const onSubmit = async (message: string) => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    setReply("");
    replyRef.current = "";

    // threadId가 없으면 생성
    const currentThreadId = threadId || crypto.randomUUID();
    if (!threadId) {
      setThreadId(currentThreadId);
    }

    // 사용자 메시지를 스토어에 저장
    addMessage({
      message: message,
      role: "user",
    });

    await sendChatMessage(message, currentThreadId, {
      onUpdate: (text: string) => {
        setReply(text);
        replyRef.current = text;
      },
      onComplete: () => {
        // reply가 완료되면 assistant 응답을 스토어에 저장
        const finalReply = replyRef.current;
        if (finalReply.trim()) {
          addMessage({
            message: finalReply,
            role: "assistant",
          });
        }
        setIsLoading(false);
        replyRef.current = "";
      },
    });
  };

  return (
    <div className="flex flex-col h-full max-w-4xl min-w-40 w-full">
      <div className="flex-1 overflow-y-auto p-4">
        <ChatBubbles />
        {isLoading && <Chatbubble message={reply} role="assistant" />}
      </div>
      <ChatInput onSubmit={onSubmit} disabled={isLoading} />
    </div>
  );
}
