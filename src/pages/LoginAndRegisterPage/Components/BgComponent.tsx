const BgComponent = ({children}:{children: any}) => {
  return (
    <div className="hero min-h-screen bg-base-200 bg-[url('src/assets/bg.png')]">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <div className="card w-96 bg-base-100 shadow-xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BgComponent