import { useEffect, useState } from "react";
import OmsViewMarkdown from "./OmsViewMarkdown.tsx";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import logo from "../../../../assets/logo.png"

// chatGPT的聊天内容
const ChatGPT = ({ message, image }: { message: string, image: string }) => {
  const [outputString, setOutputString] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // 假设你从某个数据源获取到字符串数据
    const fetchedString = message;
    // 每隔一段时间逐字输出字符串的每个字符
    const interval = setInterval(() => {
      if (index < fetchedString.length) {
        // 逐个字符输出
        setOutputString(prevString => prevString + fetchedString.charAt(index));
        setIndex(prevIndex => prevIndex + 1);
      } else {
        // 字符串输出完成，清除定时器
        clearInterval(interval);
      }
    }, 1); // 每秒输出一个字符

    // 组件卸载时清除定时器
    return () => clearInterval(interval);
  }, [index]); // 当index变化时重新执行效果


  return (
    <div className="">

      <div className="">
        <div className="card lg:min-w-[600px] md:w-96 bg-base-100 shadow-xl">
          <div className="card-body flex flex-row justify-between">
            <div className="flex flex-row">
              {/*头像*/}
              <div className="avatar items-start">
                <div className="w-10 mask mask-squircle">
                  <img
                    src={logo} />
                </div>
              </div>
              <div className="flex-col ml-4">
                <p className="join">
                  <p className="join-item">You</p>
                  <p className="join-item text-sm text-gray-400 p-1">·16m</p>
                </p>

                {image ?

                  <div>
                    <PhotoProvider>
                      <PhotoView src={`http://secocnc09.hn-bkt.clouddn.com/${image}`}>
                        <img src={`http://secocnc09.hn-bkt.clouddn.com/${image}`} alt="未加载" />
                      </PhotoView>
                    </PhotoProvider>
                    <OmsViewMarkdown textContent={outputString} />
                  </div> :

                  <div className="w-96">
                    <OmsViewMarkdown textContent={outputString} />
                  </div>

                }
              </div>

            </div>
            <div className="join">
              <button className="join-item btn btn-square btn-sm btn-ghost">
                <IconThumbUp />
              </button>
              <button className="join-item btn btn-square btn-sm btn-ghost">
                <IconThumbDown />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatGPT