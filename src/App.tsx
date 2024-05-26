import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

const App = () => {
  const [animationParent] = useAutoAnimate()
  return (
    <div>
      <div data-theme="light" ref={animationParent}>
        <Outlet />
      </div>
      <div>
        <Toaster position="top-center"
          reverseOrder={false} />
      </div>
    </div>
  )
}

export default App
