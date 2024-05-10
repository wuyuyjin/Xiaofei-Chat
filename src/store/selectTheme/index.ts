import {createSelectors} from "../../utils";
import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {createJSONStorage, persist} from "zustand/middleware";

interface themeType {
    theme: number,
    changeTheme: (theme: number) => void
}

const selectTheme = createSelectors(create<themeType>()(immer(persist((set) => ({
    theme: 0,
    changeTheme: (theme) => set(() => ({
        theme: theme
    }))
}),{
    name: "selectTheme",
    storage: createJSONStorage(() => sessionStorage),
    partialize: (state) =>
        Object.fromEntries(
            Object.entries(state).filter(
                ([key]) => ['theme'].includes(key)
            )
        )
}))))

export default selectTheme