import {IconCommand, IconGift, IconLink} from "@tabler/icons-react";

const RegisterLayout = ({children}:{children: any}) => {
  return(
    <div className="hero min-h-screen bg-base-200 bg-[url('src/assets/bg.png')] bg-fixed">
      <div className="hero-content text-center">
        <div className="card card-side bg-base-100 shadow-xl flex flex-wrap">

          <div className="card-body">
            <div className="card-title">LOGO</div>
            {children}
          </div>

          <div className="divider lg:divider-horizontal"></div>

          <div className="card-body">
            <div className="w-xl py-8">
              <div>
                <p className="flex flex-row font-bold"><IconCommand color="blue"/>Development</p>
                <p className="w-64 text-left">A modern and clean design system for developing fast and powerful web interfaces.</p>
              </div>

              <div className="py-16">
                <p className="flex flex-row font-bold"><IconGift color="blue"/>Features</p>
                <p className="w-64 text-left">A modern and clean design system for developing fast and powerful web interfaces.</p>
              </div>

              <div>
                <p className="flex flex-row font-bold"><IconLink color="blue"/>Updates</p>
                <p className="w-64 text-left">A modern and clean design system for developing fast and powerful web interfaces.</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterLayout