import toast from "react-hot-toast";
import Instance from "../../service/http/Request.tsx";
import {LoginApiType} from "./typs.ts";
import useTokenStore from "../../store/TokenStore/index.ts";
import { useNavigate } from "react-router-dom";


const LoginApi = () => {
  const changeToken = useTokenStore.use.changeToken()
  const { service } = Instance()
  const navigate = useNavigate()
  const EmailAndLoginApi = (data: LoginApiType) => {
    // return service.post("/user/login", data).then(res => {
      // if (res.data.code === 1) {
      //   toast.success("登录成功")
      //   changeToken(res.data.token)
      //   navigate("/MainPage")
      // }
    // }).catch(err => {
    //   console.error(err);
    // })
    service.post("/user/login", data).then(res => {
      console.log("res:"+JSON.stringify(res));
      if (res.code === 1) {
        toast.success("登录成功")
        changeToken(res.data.token)
        navigate("/MainPage")
      }
    }).catch(err => {
      console.error(err);
      
    })
  }

  return{EmailAndLoginApi}
}

export default LoginApi