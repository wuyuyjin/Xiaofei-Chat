import {MacScrollbar} from "mac-scrollbar";
import Chat from "./Components/Chat.tsx";
import InputAndButton from "./Components/InputAndButton.tsx";
import MainChatHeader from "./Components/MainChatHeader.tsx";
import {useParams} from "react-router";
import {useChatStore} from "../../../store/chatStore";

const MainChat = () => {
  const useChat = useChatStore.use.chatStoreState()
  const {id} = useParams()

  return (
    <MacScrollbar className="w-full h-full flex flex-col">
      {/*聊天头部*/}
      <MainChatHeader/>
      {/* 聊天内容 */}
      <div className="flex-1 overflow-y-auto bg-base-200">
        {useChat.map((items) => (
          items.id === id ?
            items.historyStore.map((item) => (
              <Chat key={item.id} item={item}/>
            )) : <div></div>
        ))}
      </div>
      {/* 输入框和按钮固定在底部 */}
      <div className="p-8 mt-auto bg-base-200">
        <InputAndButton/>
      </div>

    </MacScrollbar>
  );
};

export default MainChat;
