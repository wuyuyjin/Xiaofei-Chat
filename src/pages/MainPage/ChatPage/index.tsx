import {IconPlus} from "@tabler/icons-react";
import "mac-scrollbar/dist/mac-scrollbar.css";
import SelectModel from "./Components/SelectModel.tsx";
import HistoryRecord from "./Components/HistoryRecord.tsx";
import {Outlet} from "react-router";
import {useChatStore} from "../../../store/chatStore";

const ChatPage = () => {
  const newChat = useChatStore.use.addNewChat()
  return (
    <div className="flex flex-row h-screen w-screen">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="card-title">LOGO</div>
          <div className="divider"></div>
          <div>
            <button className="btn btn-wide btn-active btn-neutral" onClick={() => newChat()}>
              <IconPlus/>New chat
            </button>
          </div>
          <div>
            <input type="text" placeholder="搜索" className="input input-bordered w-full max-w-xs"/>
          </div>

          {/*选择大模型*/}
          <SelectModel/>
          {/*历史记录*/}
          <HistoryRecord/>
        </div>
      </div>

      {/*问答*/}
      <Outlet/>

    </div>
  );
};

export default ChatPage;
