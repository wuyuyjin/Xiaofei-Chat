import {useNavigate} from "react-router-dom";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';
import {RegisterRequestBody} from "./type";
import LoginLayout from "./Layout/LoginLayout.tsx";
import {Direction} from "../../Types/RegisterPatternType.ts";
import LoginApi from "../../Api/LoginApi";
import {rule} from "./type/rule.ts";

const formSchema = z.object({
  email: z.string().email("请输入正确邮箱地址"),
  password: z.string().min(8, "请最少输入8位").max(20, "最多输入20位").regex(rule, "只能包含字母、数字、下划线,必须数字与字母混合使用"),
})

//邮箱登录
const EmailLogin = () => {
  const navigate = useNavigate()
  const {EmailAndLoginApi} = LoginApi()
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterRequestBody>({
    resolver: zodResolver(formSchema),
  })
  const onSubmit = handleSubmit((data) => {
    console.log(data)
    const reqParams = {
      email: data.email,
      password: data.password,
      verificationCode: data.verificationCode,
      registerPattern: Direction.Email
    }
    const response = EmailAndLoginApi(reqParams)
    navigate("/MainPage")
    console.log("res:" + response)
  })

  return (
    <LoginLayout>
      <form onSubmit={onSubmit}>
        <button className="btn btn-wide btn-outline" onClick={() => navigate("/PhoneLogin")}>手机号登录</button>
        <div className="divider">OR</div>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input {...register("email")} type="tel" placeholder="请输入Email"
                 className="input input-bordered  md:input-md sm:input-sm w-full max-w-xs"
          />

          <div className="label">
            <span className="label-text-alt">{errors.email?.message &&
                <p className="text-red-600">{errors.email?.message}</p>}</span>
          </div>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">密码</span>
          </div>
          <input {...register("password")} type="password" placeholder="请输入密码"
                 className="input input-bordered md:input-md sm:input-sm w-full max-w-xs"/>
          <div className="label">
            <span className="label-text-alt">{errors.password?.message &&
                <p className="text-red-600">{errors.password?.message}</p>}</span>
          </div>
        </label>

        <div className="flex justify-between items-center">
          <label className="label cursor-pointer">
            <input type="checkbox" defaultChecked className="checkbox"/>
            <span className="label-text">记住我</span>
          </label>

          <a className="link link-hover text-[#4e81f5]">忘记密码？</a>
        </div>

        <button className="btn btn-neutral w-full sm:btn-sm md:btn-md">登录</button>

        <div className="mt-8">
          <p className="text-gray-400">没有注册账号？<a className="link link-hover text-[#4e81f5]"
                                                       onClick={() => navigate("/EmailRegister")}>请注册</a></p>
        </div>

      </form>
    </LoginLayout>
  )
}

export default EmailLogin