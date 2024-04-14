import {IconBrandTelegram, IconMicrophone, IconPhoto, IconPlus} from "@tabler/icons-react";
import Message from "../components/message";
import ChatMethod from "../server/ChatMethod.tsx";
import Dictaphone from "../server/RecordingMethod.tsx";
import {useState} from "react";

const InputAndButton = () => {
  const [chat, setChat] = useState("")
  const {errorEmpty} = Message()
  const {chatMethod, IllustratedText} = ChatMethod()

  const [base64String, setBase64String] = useState<string>('');

  //图片转换base64
  const convertToBase64 = (file: File, callback: (base64: string) => void) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        callback(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      convertToBase64(file, (base64) => setBase64String(base64));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (chat === "") {
        errorEmpty()
      } else {
        // chatMethod(chat);
        IllustratedText(chat,base64String)
        setChat("")
        setBase64String("")
      }
    }
  }

  const dictaphoneMethod = (newValue: string) => {
    setChat(newValue)
  }

  return (
    <div className="flex items-stretch justify-center join">
      <div className="dropdown dropdown-hover dropdown-top">
        <div tabIndex={0} role="button" className="btn btn-active btn-neutral btn-lg self-end join-item"><IconPlus/>
        </div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#2A4365] rounded-box w-52">
          <li><a><IconPhoto/>上传图片<input type="file" onChange={handleImageChange}/></a></li>
          <li><a><IconMicrophone/>语音输入<Dictaphone dictaphoneMethod={dictaphoneMethod}/></a></li>
        </ul>
      </div>

      <input type="text" placeholder="Send a message"
             value={chat}
             onChange={e => setChat(e.target.value)}
             onKeyDown={handleKeyDown}
             className="input input-bordered input-lg join-item w-8/12 drop-shadow-2xl"/>
      <button className="btn btn-active btn-neutral btn-lg self-end join-item"
              onClick={() => chatMethod(chat)}><IconBrandTelegram/>
      </button>
    </div>
  )
}

export default InputAndButton