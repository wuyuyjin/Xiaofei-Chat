import axios from "axios";
import { useChatStore } from "../../store/chatStore";
import { useParams } from "react-router";
import ChatMethod from "../../server/ChatMethod";

const url = "http://127.0.0.1:5000"
const Api = () => {
  const increaseChatGPTState = useChatStore.use.increaseChatGPTState()
  const chat = useChatStore.use.chat()
  const { IFlytekChat } = ChatMethod()
  const { id } = useParams()
  const GetTuShengWenApi = (formData: any) => {
    axios.post(`${url}/tushengwen`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      increaseChatGPTState(id, res.data.message, "")
    }).catch(err => {
      console.error(err)
    })
  }

  const GetWenShengTu = (content: string) => {
    axios.post(`${url}/wenshengtu`, {
      content: content
    }).then(res => {
      // 将图片进行处理
      const image = res.data.image.replace("public/", "")
      increaseChatGPTState(id, "", image)
    }).catch(err => {
      console.error(err);
    })
  }

  const Getshibiewenzi = (formData: any) => {
    axios.post(`${url}/wenzishibie`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      console.log(res)
      console.log("chat:"+chat);
      
      if (res.data.message) {
        const data = `${res.data.message}。${chat}`

        IFlytekChat(data)
      }
    }).catch(err => {
      console.error(err)
    })
  }

  return { GetTuShengWenApi, GetWenShengTu, Getshibiewenzi }
}

export default Api