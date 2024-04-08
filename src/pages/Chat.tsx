import {useChatStore} from "../store";
import {ChatGPT, MyChat} from "../components";

const Chat = () => {
  const useChat = useChatStore.use.chatStoreState()
  return (
    <div className="bg-base-200 p-8 rounded-b-lg" style={{width: "70%"}}>
      {useChat.map((item) => (
        <div key={item.id}>
          {item.type ? <ChatGPT message={item.message}/> :
            <MyChat message={item.message}/>}
        </div>
      ))}
    </div>
  )
}

export default Chat