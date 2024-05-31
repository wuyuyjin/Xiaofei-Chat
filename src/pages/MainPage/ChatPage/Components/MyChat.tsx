import { useEffect, useRef } from 'react';
import { IconEdit } from '@tabler/icons-react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const MyChat = ({ message, image }: { message: string, image: string }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 每次消息或图片更新时，将滚动条滚动到底部
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [message, image]);

  return (
    <div className="lg:w-[600px] md:w-96 flex flex-row justify-between">
      <div className="flex flex-row">
        <div className="avatar items-start">
          <div className="w-10 mask mask-squircle">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Avatar" />
          </div>
        </div>

        <div className="flex-col ml-4">
          <p className="join">
            <p className="join-item">Me</p>
            <p className="join-item text-sm text-gray-400 p-1">·16m</p>
          </p>
          {image ? (
            <div>
              <PhotoProvider>
                <PhotoView src={image}>
                  <img src={image} alt="Chat Image" height={500} width={500} />
                </PhotoView>
              </PhotoProvider>
              <div ref={chatContainerRef} className="lg:w-[500px] md:w-96 break-words">
                {message}
              </div>
            </div>
          ) : (
            <div ref={chatContainerRef} className="lg:w-[500px] break-words">
              {message}
            </div>

          )}
        </div>
      </div>
      <div>
        <button className="btn btn-ghost btn-sm"><IconEdit /></button>
      </div>
    </div>
  );
}

export default MyChat;
