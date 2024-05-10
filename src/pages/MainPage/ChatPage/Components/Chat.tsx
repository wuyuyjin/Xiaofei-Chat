import {chat, chatStoreType} from "../../../../store/chatStore/chatStore.ts";
import ChatGPT from "./ChatGPT.tsx";
import MyChat from "./MyChat.tsx";

const Chat = ({item}:{item: chatStoreType}) => {
    return (
        <div className="p-2 rounded-b-lg flex flex-col items-center">
            <div key={item.id}>
                {item.type === chat.Ai ? <ChatGPT message={item.message} image={item.image}/> :
                    <MyChat message={item.message} image={item.image}/>}
            </div>
        </div>
    )
}

export default Chat