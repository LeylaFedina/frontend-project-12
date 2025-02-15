import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { io } from 'socket.io-client';

import { receiveMessage } from '../../features/chatSlice';

const Chat = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  const chat = useSelector((state) => state.chat);
  const activeChannelIdx = chat.ui.activeChannelIndex;
  const currentChannelId = chat.channels.ids[activeChannelIdx];
  const currentChannel = chat.channels.entities[currentChannelId];
  const messageIds = chat.messages.ids.filter(
    (msgId) => chat.messages.entities[msgId].channelId === currentChannelId,
  );
  const messages = messageIds.map((id) => chat.messages.entities[id]);
  const messageCount = messageIds.length;
  const censoredChannelName = filter.clean(currentChannel?.name);

  useEffect(() => {
    const socket = io();
    socket.on('newMessage', (payload) => {
      filter.add(filter.getDictionary('en'));
      filter.add(filter.getDictionary('ru'));
      const sensoredMessage = { ...payload, body: filter.clean(payload.body) };
      dispatch(receiveMessage(sensoredMessage));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
        <b>{`# ${censoredChannelName || 'Канал не выбран'}`}</b>
        </p>
        <span className="text-muted">{`${messageCount} ${t('chat.messagesCount')}`}</span>
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
