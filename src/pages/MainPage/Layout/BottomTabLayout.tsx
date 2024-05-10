import {IconBook, IconHome, IconMessageCircle, IconUser} from "@tabler/icons-react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const BottomTabLayout = () => {
  const [selectedItem, setSelectedItem] = useState(0); // 初始选中第一个按钮
  const navigate = useNavigate()
  const data = [
    {key: 0, icon: <IconHome/>, name: "home", link: "/MainPage"},
    {key: 1, icon: <IconBook/>, name: "AI搜题", link: "AISearchQuestions"},
    {key: 2, icon: <IconMessageCircle/>, name: "chat", link: "ChatPage"},
    {key: 3, icon: <IconUser/>, name: "我的", link: "3"},
  ]

  const handleItemClick = (index: number, link: string) => {
    setSelectedItem(index); // 更新选中的按钮
    navigate(link)
  };

  return (
    <div className="btm-nav">
      {
        data.map((item, index) => (
          <button className={`${selectedItem === index ? "active" : ""}`} key={index}
                  onClick={() => handleItemClick(item.key, item.link)}>
            {item.icon}
            <span className="btm-nav-label text-xs">{item.name}</span>
          </button>
        ))
      }

    </div>
  )
}

export default BottomTabLayout