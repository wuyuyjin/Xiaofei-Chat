import {IconBook, IconHome, IconMessageCircle} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import routerPath from "../../../store/selectPath/routerPath.ts";

//侧边栏组件
const SidebarLayout = () => {
  const pathName = routerPath.use.pathName()
  const changePath = routerPath.use.changePath()
  const [selectedItem, setSelectedItem] = useState(0); // 初始选中第一个按钮
  const navigate = useNavigate()

  useEffect(() => {
    setSelectedItem(pathName)
  }, []);

  const data = [
    {key: 0, icon: <IconHome/>, name: "首页", link: "/MainPage"},
    {key: 1, icon: <IconBook/>, name: "AI搜题", link: "AISearchQuestions"},
    {key: 2, icon: <IconMessageCircle/>, name: "chat", link: "ChatPage"},
    // {key: 3, icon: <IconHome/>, name: "首页", link: "4"},
    // {key: 4, icon: <IconHome/>, name: "首页", link: "5"},
    // {key: 5, icon: <IconHome/>, name: "首页", link: "6"},
  ]

  const handleItemClick = (index: number, link: string) => {
    setSelectedItem(index); // 更新选中的按钮
    changePath(index)
    navigate(link, {replace: true})
  };

  return (
    <div className="h-screen bg-[#F9FAFB] w-20 flex flex-col justify-between">
      <ul className="space-y-8 pt-8">
        {
          data.map((item, index) => (
            <li className="flex items-center justify-center flex-col" key={index}>
              <button
                className={`btn btn-md btn-square ${selectedItem === index ? "btn-neutral btn-active" : "btn-outline"}`}
                onClick={() => handleItemClick(item.key, item.link)}
              >{item.icon}</button>
              <p className={`text-sm ${selectedItem === index ? "text-black" : "text-gray-400"}`}>{item.name}</p>
            </li>
          ))
        }
      </ul>

      <div className="space-y-8">

        {/*可以做成商城或者其他功能*/}
        {/*<div className="flex items-center justify-center">*/}
        {/*  <button className="btn btn-ghost">*/}
        {/*    <IconShoppingCart/>*/}
        {/*  </button>*/}
        {/*</div>*/}

        <div className="flex items-center justify-center flex-col">
          <div className="avatar">
            <div className="w-12 mask mask-squircle">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
            </div>
          </div>
          <button className="text-xs pb-4">体验用户</button>
        </div>
      </div>
    </div>
  )
}

export default SidebarLayout