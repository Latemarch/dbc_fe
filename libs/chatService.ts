interface ChatServiceCallbacks {
  onUpdate: (text: string) => void;
  onComplete: () => void;
}

/**
 * 마크다운 요소 앞에 줄바꿈이 없으면 추가하는 정규화 함수
 */
function normalizeMarkdown(text: string): string {
  if (!text) return text;

  let normalized = text;

  // 제목 앞에 줄바꿈 추가 (#, ##, ###, ####, #####, ######)
  // 단, 이미 줄바꿈이 있거나 텍스트 시작 부분이 아닌 경우에만
  normalized = normalized.replace(/([^\n])(#{1,6}\s)/g, "$1\n$2");

  // 리스트 항목 앞에 줄바꿈 추가 (-, *, +)
  normalized = normalized.replace(/([^\n])([-*+]\s)/g, "$1\n$2");

  // 숫자 리스트 앞에 줄바꿈 추가 (1., 2., 등)
  normalized = normalized.replace(/([^\n])(\d+\.\s)/g, "$1\n$2");

  // 인용구 앞에 줄바꿈 추가 (>)
  normalized = normalized.replace(/([^\n])(>\s)/g, "$1\n$2");

  // 코드 블록 앞에 줄바꿈 추가 (```)
  normalized = normalized.replace(/([^\n])(```)/g, "$1\n$2");

  // 수평선 앞에 줄바꿈 추가 (---, ***)
  normalized = normalized.replace(/([^\n])(---|\*\*\*)/g, "$1\n$2");

  // 테이블 시작 앞에 줄바꿈 추가 (| 헤더 |)
  // 단, 이미 줄바꿈이 있는 경우는 제외
  normalized = normalized.replace(/([^\n])(\|[^\n]*\|)/g, "$1\n$2");

  return normalized;
}

/**
 * 스트리밍 채팅 메시지를 전송하고 처리
 */
export async function sendChatMessage(
  message: string,
  threadId: string,
  callbacks: ChatServiceCallbacks
): Promise<void> {
  const { onUpdate, onComplete } = callbacks;

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: message,
      thread_id: threadId,
    }),
  });

  if (!response.body) {
    onComplete();
    return;
  }

  // 스트림 청크 처리 함수: thread_id JSON 제거 및 데이터 정제
  function processStreamChunk(chunk: string): string {
    if (!chunk.trim()) return "";

    // thread_id가 포함된 JSON 객체 제거
    try {
      const jsonData = JSON.parse(chunk);
      if (jsonData.thread_id) {
        return ""; // thread_id가 있으면 제거
      }
      // JSON이지만 thread_id가 없으면 문자열로 변환
      return JSON.stringify(jsonData);
    } catch {
      // JSON이 아니면 그대로 반환 (마크다운 텍스트)
      return chunk;
    }
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let accumulatedText = "";
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      // 버퍼에 남은 데이터 처리
      if (buffer.trim()) {
        const processed = processStreamChunk(buffer);
        if (processed) {
          accumulatedText += processed;
          onUpdate(normalizeMarkdown(accumulatedText));
        }
      }
      onComplete();
      break;
    }

    const chunk = decoder.decode(value, { stream: true });
    buffer += chunk;
    const lines = buffer.split("\n");

    // 마지막 라인은 완전하지 않을 수 있으므로 버퍼에 보관
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (!line.trim()) continue;

      // SSE 형식 처리 (data: 접두사)
      if (line.startsWith("data: ")) {
        const data = line.slice(6).trim();

        if (data === "[DONE]") {
          onComplete();
          return;
        }

        const processed = processStreamChunk(data);
        if (processed) {
          accumulatedText += processed;
          onUpdate(normalizeMarkdown(accumulatedText));
        }
      } else {
        // SSE 형식이 아닌 경우 직접 처리
        const processed = processStreamChunk(line);
        if (processed) {
          accumulatedText += processed;
          onUpdate(normalizeMarkdown(accumulatedText));
        }
      }
    }
  }
}
