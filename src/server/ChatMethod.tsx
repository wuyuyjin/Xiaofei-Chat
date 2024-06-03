import GetWebsocketUrl from "../utils/AiUtils.ts";
import { imageObj, requestObj } from "../config";
import { useChatStore } from "../store/chatStore";
import Message from "../components/message";
import { useState } from "react";
import { useParams } from "react-router";
// import { JSEncrypt } from "jsencrypt";
import useTokenStore from "../store/TokenStore/index.ts";
import { ChatUrl } from "./ChatUrl.ts";

const ChatMethod = () => {
  const { getChatWebsocketUrl, getImageWebsocketUrl, getTestUrl } = GetWebsocketUrl()
  const increaseChatState = useChatStore.use.increaseChatState()
  const increaseChatGPTState = useChatStore.use.increaseChatGPTState()
  const Authorization = useTokenStore.use.token()
  // const increaseChatState = useChatTestStore.use.increaseChatState()
  // const increaseChatGPTState = useChatTestStore.use.increaseChatGPTState()
  const imageUrl = useChatStore.use.imageUrl()
  const changeImageUrl = useChatStore.use.changeImageUrl()
  const { id } = useParams()
  const { errorEmpty } = Message()
  const [historyMessage, setHistoryMessage] = useState<any[]>([
    { role: 'user', content: '你是谁' }, //# 用户的历史问题
    { role: 'assistant', content: '我是AI助手' }
  ]);
  // 大模型回答的result
  let result: string = '';

  const IFlytekChat = (chat: string) => {
    console.log("akjdlfalsjkdfsa");
    console.log("iamge:"+imageUrl);
    console.log(11212);
    
    
    increaseChatState(id, chat, imageUrl)
    const userId = '6afec9c4-66ef-4dc1-94ed-99441d3484cb'; // 你随机设置的 userId
    const topicld = ""
    // const publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCaC4O6xRgVS8jfe3/dPluxFrCHWLRaqgnBSAnpGjL3beSr6UjgG/VqQWqH8WItyFJhCkMzfBasFM2rqGiDJFi/lOz2lY8r+0gRnfEyQ3qEUkAKgSI1YUQ+8Ng0ff6Lx9oUScUHbFTX6/cpRF9xsWi17sD4KcWUkxqGl0Z2ApFG5wIDAQAB"
    // const JSE = new JSEncrypt()
    // JSE.setPublicKey(publicKey)
    // const date = new Date()
    // const unixDate = Math.floor(date.getTime()/1000)
    // console.log("unixDate:"+unixDate)
    // const tokenUnix = JSE.encrypt(userId)+String(unixDate)
    // console.log(tokenUnix)
    // WebSocket地址
    // const socketUrl = `ws://10.23.76.122:8000/ws/ai/iflyteks?Authorization=${token}&userId=${userId}&topicld=${topicld}`;

    const socketUrl = `${ChatUrl}/ws/ai/iflyteks?Authorization=${Authorization}&userId=${userId}&topicId=`

    // 创建WebSocket对象
    const socket = new WebSocket(socketUrl);

    // 监听WebSocket连接打开事件
    socket.addEventListener('open', () => {
      console.log('WebSocket连接已打开');
      // 连接成功后发送消息
      socket.send(chat);
    });

    // 监听WebSocket接收到消息事件
    socket.addEventListener('message', (event) => {
      let data = JSON.parse(event.data);
      try {


        if (data && data.content) {
          result += data.content; // 将收到的消息 content 拼接到 result 中
          console.log('当前拼接结果:', result);
        } else {
          console.log('收到无效消息或缺少内容:', data);
        }

        // 在此可以根据需要进行其他逻辑处理
        // 例如判断是否接收到了所有需要的消息，然后进行回复等操作
      } catch (error) {
        console.error('解析消息时出错:', error);
      }

      if (!data.content) {
        socket.close()
        return;
      }
    });

    // 监听WebSocket连接关闭事件
    socket.addEventListener('close', (event) => {
      increaseChatGPTState(id, result, "")
      if (event.wasClean) {
        console.log(`WebSocket连接已关闭，状态码: ${event.code}，原因: ${event.reason}`);
      } else {
        console.log('WebSocket连接意外关闭');
      }

    });

    // 监听WebSocket发生错误事件
    socket.addEventListener('error', (error) => {
      console.error('WebSocket发生错误:', error);
    });

  }; // 仅在组件挂载和卸载时执行一次



  // 调用讯飞语言大模型api
  const chatMethod = async (chat: string) => {
    if (chat === "") {
      errorEmpty()
    } else {
      increaseChatState(id, chat, "")

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
            uid: 'wuyujin'
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
                { role: 'user', content: chat } //# 最新的一条问题，如无需上下文，可只传最新一条问题
              ]
            }
          }
        };
        socket.send(JSON.stringify(params));
      })

      socket.addEventListener('message', (event) => {
        let data = JSON.parse(event.data);
        if (!data.payload) {
          console.log(2121);

          socket.close();
          return;
        }
        result += data.payload.choices.text[0].content;
        console.log("res:" + result)

        console.log("data:" + event.data);


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
              console.log("选择关闭");

              socket.close();
            }, 1000);
          }
        }
      });
      socket.addEventListener('close', () => {
        setHistoryMessage([
          ...historyMessage,
          { role: 'user', content: chat },
          { role: 'assistant', content: result }
        ]);
        // console.log("isTrue:"+isTrue)
        // if (isTrue){
        //   increaseChatGPTState(result)
        //   setIsTrue(false)
        // }
        increaseChatGPTState(id, result, "")
        // 对话完成后socket会关闭，将聊天记录换行处理
      });
    }
  }

  // 图生文大模型
  const IllustratedText = async (chat: string, image: string) => {
    // console.log("image1:"+image.replace(prefixRegex,""))
    // const data1 = `b'${image.replace(prefixRegex,'')}'`
    // console.log("data:"+data1)

    if (chat === "") {
      errorEmpty()
    } else {
      increaseChatState(id, chat, "")

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
                { role: "user", content: image, content_type: "image" }, // 首个必须是图片
                { role: 'user', content: chat } //# 最新的一条问题，如无需上下文，可只传最新一条问题
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
        console.log("res:" + result)
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
          { role: 'user', content: chat },
          { role: 'assistant', content: result }
        ]);
        // console.log("isTrue:"+isTrue)
        // if (isTrue){
        //   increaseChatGPTState(result)
        //   setIsTrue(false)
        // }
        increaseChatGPTState(id, result, '')
        // 对话完成后socket会关闭，将聊天记录换行处理
      });
    }
  }

  const testMethod = async () => {
    let myUrl = await getTestUrl();
    // 获取输入框中的内容
    // 每次发送问题 都是一个新的websocket请求
    let socket = new WebSocket(myUrl);
    // 监听websocket的各阶段事件 并做相应处理
    socket.addEventListener('open', () => {
      // 发送消息
      let params = {
        header: {
          "Sec-WebSocket-Version": 13,
          "Sec-WebSocket-Key": "/cmERg3H91H79S5ejSsZtw==",
          "Connection": "Upgrade",
          "Upgrade": "websocket",
          "Authorization": "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZyIsInVzZXIiOnsiaWQiOiI2YWZlYzljNC02NmVmLTRkYzEtOTRlZC05OTQ0MWQzNDg0Y2IiLCJuaWNrbmFtZSI6bnVsbCwiYXZhdGFyIjpudWxsLCJ0eXBlcyI6Ik9SRElOQVJZIiwic3RhdHVzIjoiTk9STUFMIiwiZW1haWwiOiJsanpjb21lb25AZ21haWwuY29tIiwicGhvbmUiOm51bGwsImNyZWF0ZUF0IjoxNzE0NjM0ODQyNDkyLCJ1cGRhdGVBdCI6MTcxNDYzNDg0MjQ5MiwicGFzc3dvcmQiOiIkMmEkMTAkemg2aEJtZDZHM1dnTVpMOE5EUjZ1LnBEYmgzTUtvNDFISFpZMEhRR0Ivem5LMkprSklLWmEiLCJyZWdpc3RlclBhdHRlcm4iOiJFbWFpbCJ9LCJpYXQiOjE3MTQ2NDM2Nzh9.ylwe2Q1Fvnd05Ax5WmfaFBaFfliE4nmKk0muG3QG_Fw",
          "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
          "Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits",
          "Host": "10.23.76.122:8000"
        },
        parameter: {

        },
        payload: {

        }
      };
      socket.send(JSON.stringify(params));
    })

    socket.addEventListener('message', () => {
      console.log("message")
    });
    socket.addEventListener('close', () => {
      console.log("close")
    });

  }

  return { chatMethod, IllustratedText, testMethod, IFlytekChat }
}

export default ChatMethod