import { IconBrandTelegram, IconCamera, IconMicrophone, IconPhoto, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import Message from "./message";
import ChatMethod from "../../../../server/ChatMethod.tsx";
import Api from "../../../../Api/test";
// import {useChatStore} from "../../../../store/chatStore";
import Dictaphone from "../../../../server/RecordingMethod.tsx";
import useChatStore from "../../../../store/chatStore/chatStore.ts";
import { useParams } from "react-router";

const InputAndButton = () => {
  const [chat, setChat] = useState("")
  const { errorEmpty } = Message()
  const { IFlytekChat } = ChatMethod()
  const { GetTuShengWenApi, GetWenShengTu, Getshibiewenzi } = Api()
  const [file, setFile] = useState(null)
  const { id } = useParams()

  const getChat = useChatStore.use.changeChat()
  const getImageUrl = useChatStore.use.changeImageUrl()
  const increaseChatState = useChatStore.use.increaseChatState()
  const [imageUrl, setImageUrl] = useState('');


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

  const handleFileChange = (event: any) => {
    const file = event.target.files[0]
    const imageUrl = URL.createObjectURL(file);
    getImageUrl(imageUrl)
    // const fileName = file.name
    // console.log("fileName:"+fileName)
    // setImageUrl(`http://scft6edxu.hn-bkt.clouddn.com/${fileName}`);
    setImageUrl(imageUrl)
    setFile(file);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (chat === "") {
        errorEmpty()
      } else {
        if (file) {
          if (chat.includes("/task")) {
            const formData = new FormData();
            formData.append('file', file)
            getChat(chat)
            Getshibiewenzi(formData)
            setFile(null)
          } else {
            increaseChatState(id, chat, imageUrl)
            const formData = new FormData();
            formData.append('file', file);
            formData.append('chat', chat)
            //图像理解
            GetTuShengWenApi(formData)
            setFile(null)
          }
        } else {
          // chatMethod(chat);
          if (chat.includes("/Imagine")) {
            increaseChatState(id, chat, "")
            GetWenShengTu(chat)
          } else {
            // 讯飞api
            IFlytekChat(chat)
          }
        }
        setChat("")
      }
    }
  }

  const handleSubmit = (chat: string) => {
    if (chat === "") {
      errorEmpty()
    } else {
      if (file) {
        if (chat.includes("/task")) {
          const formData = new FormData();
          formData.append('file', file)
          getChat(chat)
          Getshibiewenzi(formData)
          setFile(null)
        } else {
          increaseChatState(id, chat, imageUrl)
          const formData = new FormData();
          formData.append('file', file);
          formData.append('chat', chat)
          //图像理解
          GetTuShengWenApi(formData)
          setFile(null)
        }
      } else {
        // chatMethod(chat);
        if (chat.includes("/Imagine")) {
          increaseChatState(id, chat, "")
          GetWenShengTu(chat)
        } else {
          // 讯飞api
          IFlytekChat(chat)
        }
      }
      setChat("")
    }
  }



  const dictaphoneMethod = (newValue: string) => {
    setChat(newValue)
  }

  return (
    <div className="flex items-stretch justify-center join">
      <div className="dropdown dropdown-hover dropdown-top">
        <div tabIndex={0} role="button" className="btn btn-active btn-neutral btn-md self-end join-item"><IconPlus />
        </div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow rounded-box w-52">

          <li>
            <a>
              <IconPhoto />
              <input type="file" accept="image/png,image/jpeg,image/gif,image/jpg" onChange={handleFileChange} />
            </a>
          </li>
          <li>
            <a>
              {/* <IconMicrophone /> */}
              <Dictaphone dictaphoneMethod={dictaphoneMethod} />
            </a>
          </li>
        </ul>
      </div>

      {/* <button className="btn btn-neutral join-item">
       <IconCamera/>
      </button> */}
      {/* <button className="btn btn-neutral join-item">
        <Dictaphone dictaphoneMethod={dictaphoneMethod} />
      </button> */}
      <input type="text" placeholder="尝试 /Imagine 生成图片 /task AI解题"
        value={chat}
        onChange={e => setChat(e.target.value)}
        onKeyDown={handleKeyDown}
        className="input input-bordered input-md join-item w-8/12 drop-shadow-2xl" />

      <button className="btn btn-active btn-neutral btn-md self-end join-item"
        onClick={() => handleSubmit(chat)}><IconBrandTelegram />
      </button>

    </div>
  )
}

export default InputAndButton