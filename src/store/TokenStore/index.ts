import {createSelectors} from "../../utils";
import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {createJSONStorage, persist} from "zustand/middleware";

interface tokenType {
    token: string,
    changeToken: (token: string) => void
}

const useTokenStore = createSelectors(create<tokenType>()(immer(persist((set) => ({
    token: "",
    changeToken: (token) => set(() => ({
        token: token
    }))
}),{
    name: "useTokenStore",
    storage: createJSONStorage(() => sessionStorage),
    partialize: (state) =>
        Object.fromEntries(
            Object.entries(state).filter(
                ([key]) => ['token'].includes(key)
            )
        )
}))))

export default useTokenStore