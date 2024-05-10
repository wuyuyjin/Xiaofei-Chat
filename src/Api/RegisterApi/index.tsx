import Instance from "../../service/http/Request.tsx";
import {getCodeType} from "./typs.ts";
import {RegisterRequestBody} from "../../pages/LoginAndRegisterPage/type";

const RegisterApi = () => {
  const {service} = Instance()
  const GetCodeApi = (data: getCodeType) => {
    return service.get("/verificationCode",{data})
  }

  const PhoneAndEmailRegisterApi = (data:RegisterRequestBody) => {
    return service.post("/user/register",data)
  }


  return{GetCodeApi,PhoneAndEmailRegisterApi}
}

export default RegisterApi