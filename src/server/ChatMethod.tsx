import GetWebsocketUrl from "../utils/AiUtils.ts";
import {imageObj, requestObj} from "../config";
import {useChatStore} from "../store";
import Message from "../components/message";
import {useState} from "react";

const ChatMethod = () => {
  const {getChatWebsocketUrl,getImageWebsocketUrl} = GetWebsocketUrl()
  const increaseChatState = useChatStore.use.increaseChatState()
  const increaseChatGPTState = useChatStore.use.increaseChatGPTState()
  const {errorEmpty} = Message()
  const [historyMessage, setHistoryMessage] = useState<any[]>([
    {role: 'user', content: '你是谁'}, //# 用户的历史问题
    {role: 'assistant', content: '我是AI助手'}
  ]);
  let result: string = '';
  const chatMethod = async (chat: string) => {
    if (chat === "") {
      errorEmpty()
    } else {
      increaseChatState(chat)

      let myUrl = await getChatWebsocketUrl();
      // 获取输入框中的内容
      // 每次发送问题 都是一个新的websocket请求
      let socket = new WebSocket(myUrl);

      // 监听websocket的各阶段事件 并做相应处理
      socket.addEventListener('open', () => {
        // 发送消息
        let params = {
          header: {
            app_id: requestObj.APPID,
            uid: 'wzz'
          },
          parameter: {
            chat: {
              domain: 'generalv3.5',
              temperature: 0.5,
              max_tokens: 1024
            }
          },
          payload: {
            message: {
              // 如果想获取结合上下文的回答，需要开发者每次将历史问答信息一起传给服务端，如下示例
              // 注意：text里面的所有content内容加一起的tokens需要控制在8192以内，开发者如有较长对话需求，需要适当裁剪历史信息
              text: [
                ...historyMessage,
                // ....... 省略的历史对话
                {role: 'user', content: chat} //# 最新的一条问题，如无需上下文，可只传最新一条问题
              ]
            }
          }
        };
        socket.send(JSON.stringify(params));
      })

      socket.addEventListener('message', (event) => {
        let data = JSON.parse(event.data);
        if (!data.payload) {
          socket.close();
          return;
        }
        result += data.payload.choices.text[0].content;
        console.log("res:"+result)
        if (data.header.code !== 0) {
          console.log('出错了', data.header.code, ':', data.header.message);
          // 出错了"手动关闭连接"
          socket.close();
        }
        if (data.header.code === 0) {
          // 对话已经完成
          if (data.payload.choices.text && data.header.status === 2) {
            setTimeout(() => {
              // "对话完成，手动关闭连接"
              socket.close();
            }, 1000);
          }
        }
      });
      socket.addEventListener('close', () => {
        setHistoryMessage([
          ...historyMessage,
          {role: 'user', content: chat},
          {role: 'assistant', content: result}
        ]);
        // console.log("isTrue:"+isTrue)
        // if (isTrue){
        //   increaseChatGPTState(result)
        //   setIsTrue(false)
        // }
        increaseChatGPTState(result)
        // 对话完成后socket会关闭，将聊天记录换行处理
      });
    }
  }

  const IllustratedText = async (chat: string,image: string) => {
    if (chat === "") {
      errorEmpty()
    } else {
      increaseChatState(chat)

      let myUrl = await getImageWebsocketUrl();
      // 获取输入框中的内容
      // 每次发送问题 都是一个新的websocket请求
      let socket = new WebSocket(myUrl);

      // 监听websocket的各阶段事件 并做相应处理
      socket.addEventListener('open', () => {
        // 发送消息
        let params = {
          header: {
            app_id: imageObj.APPID,
          },
          parameter: {
            chat: {
              domain: 'image',
              temperature: 0.5,
              top_k: 4,
              max_tokens: 2028,
              auditing: "default"
            }
          },
          payload: {
            message: {
              // 如果想获取结合上下文的回答，需要开发者每次将历史问答信息一起传给服务端，如下示例
              // 注意：text里面的所有content内容加一起的tokens需要控制在8192以内，开发者如有较长对话需求，需要适当裁剪历史信息
              text: [
                ...historyMessage,
                // ....... 省略的历史对话
                {role: "user", content: image, content_type:"image"}, // 首个必须是图片
                {role: 'user', content: chat} //# 最新的一条问题，如无需上下文，可只传最新一条问题
              ]
            }
          }
        };
        socket.send(JSON.stringify(params));
      })

      socket.addEventListener('message', (event) => {
        let data = JSON.parse(event.data);
        if (!data.payload) {
          socket.close();
          return;
        }
        result += data.payload.choices.text[0].content;
        console.log("res:"+result)
        if (data.header.code !== 0) {
          console.log('出错了', data.header.code, ':', data.header.message);
          // 出错了"手动关闭连接"
          socket.close();
        }
        if (data.header.code === 0) {
          // 对话已经完成
          if (data.payload.choices.text && data.header.status === 2) {
            setTimeout(() => {
              // "对话完成，手动关闭连接"
              socket.close();
            }, 1000);
          }
        }
      });
      socket.addEventListener('close', () => {
        setHistoryMessage([
          ...historyMessage,
          {role: 'user', content: chat},
          {role: 'assistant', content: result}
        ]);
        // console.log("isTrue:"+isTrue)
        // if (isTrue){
        //   increaseChatGPTState(result)
        //   setIsTrue(false)
        // }
        increaseChatGPTState(result)
        // 对话完成后socket会关闭，将聊天记录换行处理
      });
    }

  }

  return {chatMethod,IllustratedText}
}

export default ChatMethod