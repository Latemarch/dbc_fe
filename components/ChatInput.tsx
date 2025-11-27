"use client";

import { useState, useRef, FormEvent, KeyboardEvent } from "react";
import { VscSend } from "react-icons/vsc";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({
  onSubmit,
  disabled = false,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const isSubmitting = useRef(false);
  const isComposing = useRef(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !message.trim() ||
      isSubmitting.current ||
      isComposing.current ||
      disabled
    )
      return;

    isSubmitting.current = true;
    onSubmit(message);
    setMessage("");

    // 짧은 딜레이 후 제출 플래그 해제 (중복 방지)
    setTimeout(() => {
      isSubmitting.current = false;
    }, 100);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // 로딩 중이면 모든 키 입력 무시
    if (disabled) {
      e.preventDefault();
      return;
    }

    // 한글 입력 중(IME 조합 중)이면 Enter 키 무시
    if (e.nativeEvent.isComposing || isComposing.current) {
      return;
    }

    // Enter만 누르면 form 제출 (Shift는 줄바꿈)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() && !isSubmitting.current) {
        isSubmitting.current = true;
        // form submit 대신 직접 onSubmit 호출하여 중복 방지
        onSubmit(message);
        setMessage("");
        // 짧은 딜레이 후 제출 플래그 해제 (중복 방지)
        setTimeout(() => {
          isSubmitting.current = false;
        }, 100);
      }
    }
  };

  const handleCompositionStart = () => {
    isComposing.current = true;
  };

  const handleCompositionEnd = () => {
    isComposing.current = false;
    // 조합 완료 후 Enter 키가 눌렸는지 확인하여 제출
    // (이 부분은 조합 완료 이벤트에서 처리하지 않고, 다음 keyDown에서 처리)
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 items-center">
      <div className="flex gap-1 bg-chat rounded-full drop-shadow-lg">
        <div className="text-sm flex flex-1 p-1 relative items-center">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            disabled={disabled}
            placeholder={
              disabled
                ? "응답을 기다리는 중..."
                : "메시지를 입력하세요... (Shift+Enter로 줄바꿈)"
            }
            className="w-full px-4 h-12 p-2 scrollbar-hide 
                     text-gray-900 dark:text-gray-100 
                     focus:outline-none placeholder-gray-400 dark:placeholder-gray-500
                     resize-none max-h-32 overflow-y-auto
                     disabled:opacity-50 disabled:cursor-not-allowed"
            rows={1}
          />
          {/* <div className="absolute bottom-2 right-2 text-xs text-gray-400 dark:text-gray-500">
            Shift+Enter: 줄바꿈
          </div> */}
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className=" bg-blue-600 hover:bg-blue-700 
                   disabled:bg-gray-300 dark:disabled:bg-gray-600
                   disabled:cursor-not-allowed
                   text-white rounded-full transition-colors h-12
                   flex items-center justify-center min-w-12"
          >
            <VscSend />
          </button>
        </div>
      </div>
    </form>
  );
}
