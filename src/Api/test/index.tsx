import axios from "axios";
import {useChatStore} from "../../store/chatStore";

const url = ""
const Api = () => {
  const increaseChatGPTState = useChatStore.use.increaseChatGPTState()
  const GetTuShengWenApi = (formData: any) => {
    axios.post(`${url}/tushengwen`, formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      console.log(res)
      increaseChatGPTState("",res.data.message,"")
    }).catch(err => {
      console.error(err)
    })
  }

  return{GetTuShengWenApi}
}

export default Api