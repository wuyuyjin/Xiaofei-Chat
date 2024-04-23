import Chat from "./Chat";
import InputAndButton from "./InputAndButton";
import Space from "./Space";
import Divider from "./Divider";

const ChatPage = () => {

  console.log(111)
  return (
    <div className="min-h-screen bg-base-100 relative">
      <div className="flex justify-center">
        <Chat/>
      </div>
      <div>
        <Divider/>
      </div>
      <div>
        <Space/>
      </div>

      <div className="fixed inset-x-0 bottom-0 card bg-base-100 shadow-xl h-44 justify-center">
        <InputAndButton/>
      </div>
    </div>
  )
}

export default ChatPage