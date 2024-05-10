import {createSelectors} from "../../utils";
import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {createJSONStorage, persist} from "zustand/middleware";

interface routerType {
  pathName: number,
  changePath: (pathName: number) => void
}

const routerPath = createSelectors(create<routerType>()(immer(persist((set) => ({
  pathName: 0,
  changePath: (pathName) => set(() => ({
    pathName: pathName
  }))
}),{
  name: "routerPath",
  storage: createJSONStorage(() => sessionStorage),
  partialize: (state) =>
    Object.fromEntries(
      Object.entries(state).filter(
        ([key]) => ['pathName'].includes(key)
      )
    )
}))))

export default routerPath