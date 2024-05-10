import {useEffect, useState} from "react";

const ScreenSizeHook = () => {
  const [screenSize, setScreenSize] = useState<'xs' | 'md' | undefined>();

  // 定义屏幕尺寸判断的阈值
  const screenSizeThreshold = 768;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < screenSizeThreshold) {
        setScreenSize('xs');
      } else {
        setScreenSize('md');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {screenSize}
}

export default ScreenSizeHook