import {useChatStore} from "../store";
import {ChatGPT, MyChat} from "../components";

const Chat = () => {
  const useChat = useChatStore.use.chatStoreState()

  return (
    <div className="bg-base-200 p-8 rounded-b-lg" style={{width: "70%"}}>
      {useChat.map((item) => (
        <div key={item.id}>
          {item.type ? <ChatGPT message={item.message} image={item.image}/> :
            <MyChat message={item.message} image={item.image}/>}
        </div>
      ))}
    </div>
  )
}

export default Chat