import {useState} from "react";
import {IconBrandTelegram} from "@tabler/icons-react";
import Message from "../components/message";
import InputAndButtonMethod from "../server/InputAndButtonMethod.tsx";

const InputAndButton = () => {
  const [chat, setChat] = useState("")
  const {errorEmpty} = Message()
  const {handleSubmit} = InputAndButtonMethod()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (chat === "") {
        errorEmpty()
      } else {
        handleSubmit(chat);
        setChat("")
      }
    }
  }


  return (
    <div className="flex items-stretch justify-center join">
      <input type="text" placeholder="Send a message"
             value={chat}
             onChange={e => setChat(e.target.value)}
             onKeyDown={handleKeyDown}
             className="input input-bordered input-lg join-item w-8/12 drop-shadow-2xl"/>
      <button className="btn btn-active btn-neutral btn-lg self-end join-item"
              onClick={() => handleSubmit(chat)}><IconBrandTelegram/>
      </button>
    </div>
  )
}

export default InputAndButton