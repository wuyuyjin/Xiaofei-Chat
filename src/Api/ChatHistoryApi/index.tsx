import Instance from "../../service/http/Request"
import useTokenStore from "../../store/TokenStore"

const ChatHistoryApi = () => {
  const { service } = Instance()
  const token = useTokenStore.use.token()
  const getHistoryApi = () => {
    service.get("/user/topics", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(res => {
      console.log("res:" + JSON.stringify(res));
    }).catch(err => {
      console.error(err);
    })
  }

  return { getHistoryApi }
}

export default ChatHistoryApi
