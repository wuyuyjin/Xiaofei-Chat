const LoginLayout = ({children}:{children: any}) => {
  return(
    <div className="hero min-h-screen bg-base-200 bg-[url('src/assets/bg.png')] bg-fixed">
      <div className="hero-content text-center">
        <div className="card bg-base-100 shadow-xl">
          <div className="flex flex-wrap">
            <div className="card-body">
              <div className="card-title"></div>
              {children}
            </div>
            <div className="card-body bg-[#082fb6]">
              <img src="src/assets/img.png" className="w-96"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginLayout