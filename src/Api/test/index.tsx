import axios from "axios";
import { useChatStore } from "../../store/chatStore";
import { useParams } from "react-router";

const url = "http://127.0.0.1:5000"
const Api = () => {
  const increaseChatGPTState = useChatStore.use.increaseChatGPTState()
  const { id } = useParams()
  const GetTuShengWenApi = (formData: any) => {
    axios.post(`${url}/tushengwen`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      console.log(res)
      increaseChatGPTState(id, res.data.message, "")
    }).catch(err => {
      console.error(err)
    })
  }

  const GetWenShengTu = (content: string) => {
    axios.post(`${url}/wenshengtu`, {
      content: content
    }).then(res => {
      console.log(res);
      increaseChatGPTState(id, "", res.data.image)
    }).catch(err => {
      console.error(err);
    })
  }


  return { GetTuShengWenApi, GetWenShengTu }
}

export default Api