// import {getWebsocketUrl} from "../utils/AiUtils.ts";
// import {requestObj} from "../config";
// import {useChatStore} from "../store";
// import RecorderManager from "./recorderManager";
//
// const RecordingMethod = () => {
//   const changeRecordingStatus = useChatStore.use.changeRecordingStatus()
//   const setChat = useChatStore.use.changeMyChat()
//   const increaseChatState = useChatStore.use.increaseChatState()
//
//   let btnStatus = "UNDEFINED"; // "UNDEFINED" "CONNECTING" "OPEN" "CLOSING" "CLOSED"
//
//   // const btnControl = document.getElementById("btn_control");
//
//   const recorder = new RecorderManager("./recorderManager");
//   recorder.onStart = () => {
//     changeBtnStatus("OPEN");
//   }
//   let iatWS: WebSocket;
//   let resultText: string = "";
//   let resultTextTemp:string = "";
//   let countdownInterval: any;
//
//
//   const connectWebSocket = async () => {
//     const websocketUrl = await getWebsocketUrl();
//     if ("WebSocket" in window) {
//       iatWS = new WebSocket(websocketUrl);
//     }  else {
//       alert("浏览器不支持WebSocket");
//       return;
//     }
//     changeBtnStatus("CONNECTING");
//     iatWS.onopen  = () => {
//       // 开始录音
//       recorder.start({
//         sampleRate: 16000,
//         frameSize: 1280,
//       });
//       var params = {
//         common: {
//           app_id: requestObj.APPID,
//         },
//         business: {
//           language: "zh_cn",
//           domain: "iat",
//           accent: "mandarin",
//           vad_eos: 5000,
//           dwa: "wpgs",
//         },
//         data: {
//           status: 0,
//           format: "audio/L16;rate=16000",
//           encoding: "raw",
//         },
//       };
//       iatWS.send(JSON.stringify(params));
//     };
//     iatWS.onmessage = (e) => {
//       renderResult(e.data);
//     };
//     iatWS.onerror = (e) => {
//       console.error(e);
//       recorder.stop();
//       changeBtnStatus("CLOSED");
//     };
//     iatWS.onclose = () => {
//       recorder.stop();
//       changeBtnStatus("CLOSED");
//     };
//   }
//
//   const changeBtnStatus = (status:string) => {
//     btnStatus = status;
//     if (status === "CONNECTING") {
//       // btnControl.innerText = "建立连接中";
//       changeRecordingStatus("建立连接中")
//       // document.getElementById("result").innerText = "";
//       setChat("")
//       resultText = "";
//       resultTextTemp = "";
//     } else if (status === "OPEN") {
//       countdown();
//     } else if (status === "CLOSING") {
//       // btnControl.innerText = "关闭连接中";
//       changeBtnStatus("关闭连接中")
//     } else if (status === "CLOSED") {
//       // btnControl.innerText = "开始录音";
//       changeBtnStatus("开始录音")
//     }
//   }
//
//   function renderResult(resultData:string) {
//     // 识别结束
//     let jsonData = JSON.parse(resultData);
//     if (jsonData.data && jsonData.data.result) {
//       let data = jsonData.data.result;
//       let str = "";
//       let ws = data.ws;
//       for (let i = 0; i < ws.length; i++) {
//         str = str + ws[i].cw[0].w;
//       }
//       // 开启wpgs会有此字段(前提：在控制台开通动态修正功能)
//       // 取值为 "apd"时表示该片结果是追加到前面的最终结果；取值为"rpl" 时表示替换前面的部分结果，替换范围为rg字段
//       if (data.pgs) {
//         if (data.pgs === "apd") {
//           // 将resultTextTemp同步给resultText
//           resultText = resultTextTemp;
//         }
//         // 将结果存储在resultTextTemp中
//         resultTextTemp = resultText + str;
//       } else {
//         resultText = resultText + str;
//       }
//       // document.getElementById("result").innerText = resultTextTemp || resultText || "";
//       setChat(resultTextTemp || resultText || "")
//       increaseChatState(resultTextTemp || resultText || "")
//     }
//     if (jsonData.code === 0 && jsonData.data.status === 2) {
//       iatWS.close();
//     }
//     if (jsonData.code !== 0) {
//       iatWS.close();
//       console.error(jsonData);
//     }
//   }
//
//   function countdown() {
//     let seconds = 60;
//     // btnControl.innerText = `录音中（${seconds}s）`;
//     changeBtnStatus(`录音中（${seconds}s）`)
//     countdownInterval = setInterval(() => {
//       seconds = seconds - 1;
//       if (seconds <= 0) {
//         clearInterval(countdownInterval);
//         recorder.stop();
//       } else {
//         // btnControl.innerText = `录音中（${seconds}s）`;
//         changeBtnStatus(`录音中（${seconds}s）`)
//       }
//     }, 1000);
//   }
//
//   const recordingBtn = () => {
//     if (btnStatus === "UNDEFINED" || btnStatus === "CLOSED") {
//       connectWebSocket();
//     } else if (btnStatus === "CONNECTING" || btnStatus === "OPEN") {
//       // 结束录音
//       recorder.stop();
//     }
//   }
//
//   return {recordingBtn}
// }
//
// export default RecordingMethod

import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import {useEffect} from "react";

const Dictaphone = ({dictaphoneMethod}: {dictaphoneMethod: any}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const startListening = () => SpeechRecognition.startListening({continuous: true, language: "zh-CN"})

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  
  const start = () => {
    if (listening){
      SpeechRecognition.stopListening()
    }else {
      startListening()
    }
  }

  useEffect(() => {
    const handleClick = () => {
      dictaphoneMethod(transcript)
    }
    handleClick()
  }, [transcript]);



  return (
    <div>
      {/*<p>Microphone: {listening ? 'on' : 'off'}</p>*/}
      {/*<button onClick={startListening}>Start</button>*/}
      {/*<button onClick={SpeechRecognition.stopListening}>Stop</button>*/}
      <button onClick={() => start()}>{listening?"暂停":"开始"}</button>
      <button className="ml-2" onClick={resetTranscript}>重录</button>
    </div>
  );
};
export default Dictaphone;