import {getLocalTime} from "../store/chatStore";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

// 用户的聊天内容
const MyChat = ({message, image}: { message: string, image: string }) => {

  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src="src/assets/Me.png" alt="头像"/>
        </div>
      </div>
      <div className="chat-header flex space-x-2">
        <div>Me</div>
        <time className="text-xs opacity-50">{getLocalTime}</time>
      </div>
      {image ?
        <div className="chat-bubble min-w-{30%} break-words">
          <PhotoProvider>
            <PhotoView src={image} >
              <img src={image} alt="" height={500} width={500}/>
            </PhotoView>
          </PhotoProvider>
          <div className="chat-bubble min-w-{50%} max-h-screen break-words">{message}</div>
        </div> :
        <div className="chat-bubble min-w-{50%} max-h-screen break-words">{message}</div>
      }
    </div>
  )
}

export default MyChat