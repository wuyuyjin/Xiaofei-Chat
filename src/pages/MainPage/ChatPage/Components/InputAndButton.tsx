import {IconBrandTelegram} from "@tabler/icons-react";
import { useState } from "react";
import Message from "./message";
import ChatMethod from "../../../../server/ChatMethod.tsx";
import Api from "../../../../Api/test";
// import {useChatStore} from "../../../../store/chatStore";
import Dictaphone from "../../../../server/RecordingMethod.tsx";

const InputAndButton = () => {
  const [chat, setChat] = useState("")
  const {errorEmpty} = Message()
  const {chatMethod} = ChatMethod()
  const {GetTuShengWenApi} = Api()
  const [file, setFile] = useState(null)
  // const increaseChatState = useChatStore.use.increaseChatState()
  // const [imageUrl, setImageUrl] = useState('');


  // 图片转换base64
  // const convertToBase64 = (file: File, callback: (base64: string) => void) => {
  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     if (event.target?.result) {
  //       callback(event.target.result as string);
  //     }
  //   };
  //   reader.readAsDataURL(file);
  // };
  //
  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     convertToBase64(file, (base64) => setBase64String(base64));
  //   }
  // };

  // const handleFileChange = (event: any) => {
  //   const file = event.target.files[0]
  //   const imageUrl = URL.createObjectURL(file);
  //   console.log('imageUrl:'+imageUrl)
  //
  //   // const fileName = file.name
  //   // console.log("fileName:"+fileName)
  //   // setImageUrl(`http://scft6edxu.hn-bkt.clouddn.com/${fileName}`);
  //   setImageUrl(imageUrl)
  //   setFile(file);
  // };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (chat === "") {
        errorEmpty()
      } else {
        if (file){
          // increaseChatState(chat,imageUrl)
          const formData = new FormData();
          formData.append('file', file);
          formData.append('chat',chat)
          //图像理解
          GetTuShengWenApi(formData)
          setFile(null)
        }else {
          chatMethod(chat);
          //测试
          // test()
        }
        setChat("")
      }
    }
  }

  const handleSubmit = (chat: string) => {
      if (chat === "") {
        errorEmpty()
      } else {
        if (file){
          // increaseChatState(chat,imageUrl)
          const formData = new FormData();
          formData.append('file', file);
          formData.append('chat',chat)
          //图像理解
          GetTuShengWenApi(formData)
          setFile(null)
        }else {
          chatMethod(chat);
          // 测试
          // test()
        }

        setChat("")
      }
    }



  const dictaphoneMethod = (newValue: string) => {
    setChat(newValue)
  }

  return (
    <div className="flex items-stretch justify-center join">
      {/*<div className="dropdown dropdown-hover dropdown-top">*/}
      {/*  <div tabIndex={0} role="button" className="btn btn-active btn-neutral btn-md self-end join-item"><IconPlus/>*/}
      {/*  </div>*/}
      {/*  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#2A4365] rounded-box w-52">*/}
      {/*    <li><a><IconPhoto/>*/}
      {/*      <input type="file" accept="image/png,image/jpeg,image/gif,image/jpg" onChange={handleFileChange}/>*/}
      {/*    </a></li>*/}
      {/*    <li><a><IconMicrophone/><Dictaphone dictaphoneMethod={dictaphoneMethod}/></a></li>*/}
      {/*  </ul>*/}
      {/*</div>*/}

      {/*<button className="btn btn-neutral join-item">*/}
      {/*  <IconCamera/>*/}
      {/*</button>*/}
      <button className="btn btn-neutral join-item">
        <Dictaphone dictaphoneMethod={dictaphoneMethod}/>
      </button>
      <input type="text" placeholder="Send a message"
             value={chat}
             onChange={e => setChat(e.target.value)}
             onKeyDown={handleKeyDown}
             className="input input-bordered input-md join-item w-8/12 drop-shadow-2xl"/>

      <button className="btn btn-active btn-neutral btn-md self-end join-item"
              onClick={() => handleSubmit(chat)}><IconBrandTelegram/>
      </button>

    </div>
  )
}

export default InputAndButton