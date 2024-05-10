import {IconBrandGoogle, IconDeviceMobile, IconMail} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";

const RegisterComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="card-body">
      {/*头像*/}
      <div>
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
          </div>
        </div>
      </div>

      <div>
        <p className="font-bold text-2xl">欢迎使用AI+</p>
      </div>

      <div className="space-y-2">
        <button className="btn btn-wide btn-outline sm:btn-sm md:btn-md lg:btn-lg" onClick={() => navigate("/EmailRegister")}><IconMail/>邮箱注册</button>
        <button className="btn btn-wide btn-outline sm:btn-sm md:btn-md lg:btn-lg" onClick={() => navigate("/PhoneRegister")}><IconDeviceMobile/>手机号注册
        </button>
        <button className="btn btn-wide btn-outline sm:btn-sm md:btn-md lg:btn-lg"><IconBrandGoogle/>Google注册</button>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-thin">欢迎加入我们的AI+团队</p>
        <div className="text-sm space-x-0"><p>是否存在账号？</p><a className="link link-hover text-[#4e81f5]" onClick={() => navigate("/EmailLogin")}>请登录</a></div>
      </div>
    </div>
  )
}

export default RegisterComponent