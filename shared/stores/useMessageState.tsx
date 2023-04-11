import { create } from "zustand";

type Message = {
  type: string;
  message: string;
  date: Date;
};

type MessageHistory = Message[];

interface MessageState {
  chatHistory: Record<string, MessageHistory>;
  addMessageToHistory: (historyId: string, message: Message) => void;
}

export const useMessageState = create<MessageState>()((set) => ({
  chatHistory: {},
  addMessageToHistory: (historyId: string, message: Message) =>
    set((state) => ({
      chatHistory: {
        ...state.chatHistory,
        [historyId]: [
          ...state.chatHistory[historyId],
          {
            ...message,
          },
        ],
      },
    })),
}));
