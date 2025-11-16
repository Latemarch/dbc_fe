import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Message {
  message: string;
  role: "user" | "assistant";
}

interface ConversationStore {
  messages: Message[];
  addMessage: (message: Message) => void;
  threadId: string | null;
  setThreadId: (threadId: string | null) => void;
}

export const useConversationStore = create<ConversationStore>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      threadId: null,
      setThreadId: (threadId) => set({ threadId }),
    }),
    {
      name: "conversation-storage",
    }
  )
);
