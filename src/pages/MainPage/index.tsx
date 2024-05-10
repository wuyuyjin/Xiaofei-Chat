import {Outlet} from "react-router";
import SidebarLayout from "./Layout/SidebarLayout.tsx";
import BottomTabLayout from "./Layout/BottomTabLayout.tsx";
import ScreenSizeHook from "../../hooks/ScreenSizeHook.tsx";

const MainPage = () => {
  const {screenSize} = ScreenSizeHook()

  return(
    <div className="flex flex-row">
      {
        screenSize === "md"?<SidebarLayout/>:<BottomTabLayout/>
      }
      <Outlet/>
    </div>
  )
}

export default MainPage