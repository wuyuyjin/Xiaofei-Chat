import {getLocalTime} from "../store";

// 用户的聊天内容
const MyChat = ({message}: { message: string }) => {

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
            <div className="chat-bubble min-w-{50%} max-h-screen break-words">{message}</div>
        </div>
    )
}

export default MyChat