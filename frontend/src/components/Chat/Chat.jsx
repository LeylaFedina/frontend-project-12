import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { openRenameChannelModal } from '../../features/chatSlice';

const Chat = () => {
  const dispatch = useDispatch();

  const chat = useSelector((state) => state.chat);
  const activeChannelIdx = chat.ui.activeChannelIndex;
  const currentChannelId = chat.channels.ids[activeChannelIdx];
  const currentChannel = chat.channels.entities[currentChannelId];
  const messageIds = chat.messages.ids.filter(
    (msgId) => chat.messages.entities[msgId].channelId === currentChannelId,
  );
  const messages = messageIds.map((id) => chat.messages.entities[id]);
  const messageCount = messageIds.length;

  useEffect(() => {
    const socket = io();
    socket.on('newMessage', (data) => {
      dispatch(openRenameChannelModal(data));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${currentChannel?.name}`}</b>
        </p>
        <span className="text-muted">{`${messageCount} сообщений`}</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {messages &&
          messages.map((msg) => {
            const { id, username, body } = msg;
            return (
              <div key={id} className="text-break mb-2">
                <b>{username}:</b> {body}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Chat;
