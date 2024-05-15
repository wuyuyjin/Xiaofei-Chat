import {useEffect, useState} from "react";

const TimeHook = () => {

  const [isTiming, setIsTiming] = useState(false)
  const [remainingTime, setRemainingTime] = useState(60);
  //计时器
  useEffect(() => {
    if (isTiming) {
      setTimeout(() => {
        if (remainingTime !== 1) {
          setRemainingTime(remainingTime - 1)
        } else {
          setRemainingTime(10)
          setIsTiming(false)
        }
      }, 1000)
    }

  }, [isTiming, remainingTime]);

  const getTime = () => {
    setIsTiming(!isTiming)
  }

  return {getTime,isTiming,remainingTime}
}

export default TimeHook