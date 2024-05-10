import {MacScrollbar} from "mac-scrollbar";
import {IconCircleX, IconMessage} from "@tabler/icons-react";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useChatStore} from "../../../../store/chatStore";

// 历史记录
const HistoryRecord = () => {
  const [selectGpt, setSelectGpt] = useState(0);
  const [reachedBottom, setReachedBottom] = useState(false);
  const scrollContainerRef = useRef(null);

  const gptData = useChatStore.use.chatStoreState()
  const navigate = useNavigate()
  useEffect(() => {
    const handleBottomScroll = () => {
      if (reachedBottom) {
        // 当历史记录触到底部时就可以请求一次
        console.log("Reached bottom! Trigger API request...");
      }
    };

    handleBottomScroll()
  }, [reachedBottom]);
  const selectGptMethod = (index:number) => {
    setSelectGpt(index);
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollTop, clientHeight, scrollHeight } = container;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;
      setReachedBottom(isAtBottom);
    }
  };

  return(
    <div className="mt-4">
      <p className="sm:text-sm md:text-md">历史记录</p>
      <MacScrollbar
        className="h-1/2 absolute"
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        {gptData.map((items, index) => (
          <div
            className={`card shadow-xl w-64 h-20 mt-2 ${
              selectGpt === index ? "bg-neutral text-neutral-content" : ""
            }`}
            key={items.id}
            onClick={() => {
              selectGptMethod(index)
              navigate(items.id)
            }}
          >
            <div className="card-body text-left text-sm felx flex-row justify-between">
              <IconMessage size="20"/>
              {/* 根据第二条数据的存在与否展示不同内容 */}
              {items.historyStore.length >= 2 ? (
                  <p className="truncate w-20">{items.historyStore[1].message}</p>
              ) : (
                  <p className="">New Chat</p>
              )}
              <IconCircleX size="20"/>
            </div>
          </div>
        ))}
      </MacScrollbar>
    </div>
  )
}

export default HistoryRecord