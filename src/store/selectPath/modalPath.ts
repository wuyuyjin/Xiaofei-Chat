import {createSelectors} from "../../utils";
import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {createJSONStorage, persist} from "zustand/middleware";

interface routerType {
  modalName: number,
  changeModal: (modalName: number) => void
}

const modalPath = createSelectors(create<routerType>()(immer(persist((set) => ({
  modalName: 0,
  changeModal: (modalName) => set(() => ({
    modalName: modalName
  }))
}),{
  name: "modalPath",
  storage: createJSONStorage(() => sessionStorage),
  partialize: (state) =>
    Object.fromEntries(
      Object.entries(state).filter(
        ([key]) => ['modalName'].includes(key)
      )
    )
}))))

export default modalPath