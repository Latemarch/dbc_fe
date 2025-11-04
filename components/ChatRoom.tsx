"use client";
import ChatInput from "./ChatInput";
import * as React from "react";

export default function ChatRoom() {
  const [reply, setReply] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onSubmit = async (message: string) => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    setReply("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: message, thread_id: "123" }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: "응답을 받아올 수 없습니다.",
        }));
        setReply(
          `오류: ${errorData.error || "알 수 없는 오류가 발생했습니다."}`
        );
        setIsLoading(false);
        return;
      }

      if (!response.body) {
        setReply("오류: 스트림 응답을 받을 수 없습니다.");
        setIsLoading(false);
        return;
      }

      // ReadableStream을 읽어서 스트림 데이터 처리
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          setIsLoading(false);
          break;
        }

        // 청크 데이터 디코딩
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          // SSE 형식: "data: {content}" 또는 "data: [DONE]"
          if (line.startsWith("data: ")) {
            const data = line.slice(6); // "data: " 제거

            if (data === "[DONE]") {
              setIsLoading(false);
              break;
            }

            // JSON 형식의 데이터 파싱 시도 (thread_id 등)
            if (data.startsWith("{")) {
              try {
                JSON.parse(data);
                // thread_id 같은 메타데이터는 무시하고 메시지만 처리
                continue;
              } catch {
                // JSON 파싱 실패 시 일반 텍스트로 처리
              }
            }

            // 에러 메시지 확인
            if (data.startsWith("Error: ")) {
              setReply(data);
              setIsLoading(false);
              return;
            }

            // 일반 텍스트 데이터 누적
            accumulatedText += data;
            setReply(accumulatedText);
          }
        }
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      setReply(
        `오류: ${
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다."
        }`
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl min-w-40 w-full">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="text-gray-500 dark:text-gray-400">
          {reply ||
            (isLoading
              ? "응답을 기다리는 중..."
              : "대화 내용이 여기에 표시됩니다...")}
        </div>
      </div>
      <ChatInput onSubmit={onSubmit} disabled={isLoading} />
    </div>
  );
}
