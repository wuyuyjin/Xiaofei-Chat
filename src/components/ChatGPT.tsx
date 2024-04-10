import {getLocalTime} from "../store";
import {useEffect, useState} from "react";
import OmsViewMarkdown from "./OmsViewMarkdown.tsx";

// chatGPT的聊天内容
const ChatGPT = ({message}: { message: string }) => {
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
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src="src/assets/logo.png" alt="没有"/>
        </div>
      </div>
      <div className="chat-header flex space-x-2">
        <div>小飞AI</div>
        <time className="text-xs opacity-50">{getLocalTime}</time>
      </div>
      <div className="chat-bubble min-w-{50%}  break-words">
        <OmsViewMarkdown textContent={outputString}/>
      </div>
    </div>
  )
}

export default ChatGPT