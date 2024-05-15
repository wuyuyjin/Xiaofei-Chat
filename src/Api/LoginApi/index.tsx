import Instance from "../../service/http/Request.tsx";
import {LoginApiType} from "./typs.ts";

const LoginApi = () => {
  const {service} = Instance()
  const EmailAndLoginApi = (data: LoginApiType) => {
    return service.post("/user/login",data)
  }

  return{EmailAndLoginApi}
}

export default LoginApi