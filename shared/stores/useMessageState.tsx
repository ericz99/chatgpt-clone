import { create } from "zustand";

type Message = {
  role: string;
  content: string;
};

type MessageHistory = Message[];

interface MessageState {
  chatHistory: MessageHistory;
  addMessageToHistory: (message: Message) => void;
}

export const useMessageState = create<MessageState>()((set) => ({
  chatHistory: [],
  addMessageToHistory: (message: Message) =>
    set((state) => ({
      chatHistory: [...state.chatHistory, message],
    })),
}));
