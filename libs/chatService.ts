interface ChatServiceCallbacks {
  onStart: () => void;
  onUpdate: (text: string) => void;
  onError: (error: string) => void;
  onComplete: () => void;
}

interface ChatRequest {
  question: string;
  thread_id: string;
}

/**
 * 스트리밍 채팅 메시지를 처리하는 서비스 함수
 * @param message 사용자 메시지
 * @param threadId 대화 스레드 ID
 * @param callbacks 상태 업데이트 콜백 함수들
 */
export async function sendChatMessage(
  message: string,
  threadId: string,
  callbacks: ChatServiceCallbacks
): Promise<void> {
  const { onStart, onUpdate, onError, onComplete } = callbacks;

  if (!message.trim()) {
    return;
  }

  onStart();

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: message,
        thread_id: threadId,
      } as ChatRequest),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: "응답을 받아올 수 없습니다.",
      }));
      onError(
        `오류: ${errorData.error || "알 수 없는 오류가 발생했습니다."}`
      );
      onComplete();
      return;
    }

    if (!response.body) {
      onError("오류: 스트림 응답을 받을 수 없습니다.");
      onComplete();
      return;
    }

    // ReadableStream을 읽어서 스트림 데이터 처리
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let accumulatedText = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        onComplete();
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
            onComplete();
            return;
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
            onError(data);
            onComplete();
            return;
          }

          // 일반 텍스트 데이터 누적
          accumulatedText += data;
          onUpdate(accumulatedText);
        }
      }
    }
  } catch (error) {
    console.error("Error in sendChatMessage:", error);
    onError(
      `오류: ${
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다."
      }`
    );
    onComplete();
  }
}

