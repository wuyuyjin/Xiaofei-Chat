import { create } from 'zustand'
import { createSelectors } from "../../utils";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { v4 as uuid } from 'uuid';

export enum chat {
  Ai,
  Me
}

export interface chatStoreType {
  type: chat
  id: string
  message: string
  image: string
}

interface chatHistoryStoreType {
  id: string
  historyStore: chatStoreType[]
}

interface chatState {
  chat: string,
  changeChat: (chat: string) => void
  imageUrl: string
  changeImageUrl: (imageUrl: string) => void
  chatStoreState: chatHistoryStoreType[]
  addNewChat: (id: string) => void
  increaseChatState: (id: string | undefined, message: string, image: string) => void
  increaseChatGPTState: (id: string | undefined, message: string, image: string) => void
  delHistory: (id: string) => void
}

const useChatStore = createSelectors(create<chatState>()(immer(devtools(persist((set) => ({

  chat: "",

  changeChat: (chat) => set(() => ({
    chat: chat
  })),

  imageUrl: "",

  changeImageUrl: (imageUrl) => set(() => ({
    imageUrl: imageUrl
  })),

  // AI是ChatGPT
  chatStoreState: [
    // {id: uuid(), historyStore: [{type: chat.Ai, id: uuid(), message: "欢迎使用小飞AI！", image: ""}]}
  ],

  addNewChat: (id) => set((state) => ({
    chatStoreState: [...state.chatStoreState, {
      id: id,
      historyStore: [
        { type: chat.Ai, id: uuid(), message: "欢迎使用AI智慧助手!", image: "" }
      ]
    }]
  })),

  // 用户聊天记录
  increaseChatState: (id, message, image) => set((state) => {
    const updatedState = state.chatStoreState.map(item => {
      if (item.id === id) {
        return {
          ...item,
          historyStore: [
            ...item.historyStore,
            {
              type: chat.Me,
              id: uuid(),
              message: message,
              image: image
            }
          ]
        };
      }
      return item;
    });

    return { chatStoreState: updatedState };
  }),

  // gpt聊天记录
  increaseChatGPTState: (id, message, image) => set((state) => {
    const updatedState = state.chatStoreState.map(item => {
      if (item.id === id) {
        return {
          ...item,
          historyStore: [
            ...item.historyStore,
            {
              type: chat.Ai,
              id: uuid(),
              message: message,
              image: image
            }
          ]
        };
      }
      return item;
    });

    return { chatStoreState: updatedState };
  }),

  delHistory: (id) => set((state) => ({
    chatStoreState: state.chatStoreState.filter((item) => item.id !== id)
  })),

}), {
  name: "chatStore",
  storage: createJSONStorage(() => localStorage),
  partialize: (state) =>
    Object.fromEntries(
      Object.entries(state).filter(
        ([key]) => ['chatStoreState'].includes(key)
      )
    )
}
), {
  name: "chatStore",
  enabled: true
}))))

export default useChatStore