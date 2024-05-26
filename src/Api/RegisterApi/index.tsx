import Instance from "../../service/http/Request.tsx";
import { getCodeType } from "./typs.ts";
import { RegisterRequestBody } from "../../pages/LoginAndRegisterPage/type";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useTokenStore from "../../store/TokenStore/index.ts";

const RegisterApi = () => {
  const { service } = Instance()
  const navigate = useNavigate()
  const changeToken = useTokenStore.use.changeToken()
  // 发送验证码
  const GetCodeApi = async (data: getCodeType) => {
    await service.get("/verificationCode", {
      params: data
    }).then(res => {
      if (res.code === 1) {
        toast.success("邮箱发送成功")
      }
    }).catch(err => {
      console.error(err);
    })
  }

  // 注册
  const PhoneAndEmailRegisterApi = async (data: RegisterRequestBody) => {
    await service.post("/user/register", data).then(res => {
      if (res.code === 1) {
        toast.success("注册成功")
        changeToken(res.data.token)
        navigate("/MainPage")
      }
    }).catch(err => {
      console.error(err);
    })
  }


  return { GetCodeApi, PhoneAndEmailRegisterApi }
}

export default RegisterApi