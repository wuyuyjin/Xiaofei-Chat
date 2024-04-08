import { useAutoAnimate } from '@formkit/auto-animate/react'
import ChatPage from "./pages";

const App = () => {
    const [animationParent] = useAutoAnimate()
    return (
        <div data-theme="dracula" ref={animationParent}>
            <ChatPage/>
        </div>
    )
}

export default App
