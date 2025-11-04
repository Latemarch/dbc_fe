import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Conversation {
  id: string;
  messages: Message[];
}

interface Message {
  message: string;
  role: "user" | "assistant";
}

interface ConversationStore {
  conversation: Conversation[];
  addConversation: (conversation: Conversation) => void;
}

export const useConversationStore = create<ConversationStore>()(
  persist(
    (set) => ({
      conversation: [],
      addConversation: (conversation) =>
        set((state) => ({
          conversation: [...state.conversation, conversation],
        })),
    }),
    {
      name: "conversation-storage",
    }
  )
);
