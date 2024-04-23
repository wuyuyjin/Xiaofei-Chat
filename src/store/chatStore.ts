import {create} from 'zustand'
import {createSelectors} from "../utils";
import {immer} from "zustand/middleware/immer";
import {createJSONStorage, devtools, persist} from "zustand/middleware";
import {v4 as uuid} from 'uuid';
import axios from "axios";

interface chatStoreType {
  type: boolean
  id: string
  message: string
  image: string
}

interface chatState {
  chatStoreState: chatStoreType[]
  increaseChatState: (message: string,image: string) => void
  increaseChatGPTState: (message: string,image: string) => void
  messageHttp: (message: string) => void
}

const useChatStore = createSelectors(create<chatState>()(immer(devtools(persist((set) => ({

    // true是ChatGPT
    chatStoreState: [
      {type: true, id: "1", message: "欢迎使用小飞AI！",image: ""},
    ],

    // 用户聊天记录
    increaseChatState: (message,image) => set((state) => ({
      chatStoreState: [...state.chatStoreState, {
        type: false,
        id: uuid(),
        message: message,
        image: image
      }]
    })),

    // GPT聊天记录
    increaseChatGPTState: (message,image) => set((state) => ({
      chatStoreState: [...state.chatStoreState, {
        type: true,
        id: uuid(),
        message: message,
        image: image
      }]
    })),

    // 暂时用不到，先留着
    messageHttp: async (message) => {
      await axios.post("", {
        message: message
      }).then(res => {
        console.log(res)
        set((state) => ({
          chatStoreState: [...state.chatStoreState, {
            type: true,
            id: uuid(),
            message: res.data.message
          }]
        }))
      }).catch(err => {
        console.log(err)
      })
    }

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