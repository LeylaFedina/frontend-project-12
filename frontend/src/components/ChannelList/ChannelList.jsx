import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { openDeleteChannelModal, setActiveChannel, openRenameChannelModal, updateChannels} from '../../features/chatSlice';
import filter from 'leo-profanity';
import { io } from 'socket.io-client';
import RemoveChannel from '../modals/RemoveChannel';
import RenameChannel from '../modals/RenameChannel';

const ChannelList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channelData = useSelector((state) => state.chat.channels);
  const currentChannelIndex = useSelector((state) => state.chat.ui.activeChannelIndex);

  const openDeleteDialog = (channelId) => {
    dispatch(openDeleteChannelModal,(channelId));
  };

  const openRenameDialog = (channelId) => {
    dispatch(openRenameChannelModal(channelId));
  };

  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  useEffect(() => {
    const socket = io();
    socket.on('newChannel', (payload) => {
      if (!channels[payload.id]) {
        dispatch(addChannel(payload));
      }
    });
    socket.on('removeChannel', (payload) => {
      dispatch(updateChannels(payload));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, channels]);

  return (
    <>
      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channelData.ids.map((channelId, idx) => {     
          const { name, id, removable } = channelData.entities[channelId];
          const censoredChannelName = filter.clean(name);
          const isChannelActive = currentChannelIndex === idx;
          const buttonStyle = isChannelActive ? 'btn-secondary' : 'btn-light';

          return (
            <li key={id} className="nav-item w-100">
              {removable ? (
                <Dropdown as={ButtonGroup} className="d-flex">
                  <Button
                    className={`text-start rounded-0 ${buttonStyle} ${isChannelActive ? 'active' : ''}`}
                    onClick={() => dispatch(setActiveChannel(idx))}
                  >
                    <span className="me-1">#</span>
                    {censoredChannelName}
                  </Button>

                  <Dropdown.Toggle
                    split
                    variant={buttonStyle}
                    id={`dropdown-split-${id}`}
                    className={`rounded-0.5 ${isChannelActive ? 'active' : ''}  ${isChannelActive ? 'btn-secondary' : ''}`}
                  >                 
                  <span className="visually-hidden">{t('chat.channels.properties')}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => openDeleteDialog(id)} href="#">
                      Удалить
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => openRenameDialog(id)} href="#">
                      Переименовать
                    </Dropdown.Item>
                  </Dropdown.Menu>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => openDeleteDialog(id)} href="#">
                      {t('chat.channels.dropdown.deleteBtn')}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => openRenameDialog(id)} href="#">
                      {t('chat.channels.dropdown.renameBtn')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button
                  type="button"
                  className={`w-100 rounded-0 text-start btn ${buttonStyle} ${isChannelActive ? 'active' : ''}`}
                  onClick={() => dispatch(setActiveChannel(idx))}
                >
                  <span className="me-1">#</span>
                  {name}
                </Button>
              )}
            </li>
          );
        })}
      </ul>
      <RemoveChannel />
      <RenameChannel />
    </>
  );
};

export default ChannelList;
