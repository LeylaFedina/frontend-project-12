import { FaPlus as AddIcon } from 'react-icons/fa';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setUser } from '../../features/loginSlice';
import { getChannels, getMessages, openAddChannelModal } from '../../features/chatSlice';
import ChannelList from '../../components/ChannelList/ChannelList';
import Chat from '../../components/Chat/Chat';
import SendMessageForm from '../../components/forms/SendMessageForm';
import NewChannel from '../../components/modals/NewChannel';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const StorageToken = userData?.token;
    if (!StorageToken) {
      navigate('/login');
    } else {
      dispatch(setUser(userData));
      dispatch(getChannels());
      dispatch(getMessages());
    }
  }, [navigate, dispatch]);

  const openModal = () => {
    dispatch(openAddChannelModal());
  };

  return (
    <div className="container-fluid h-100 p-3">
      <div className="row h-100 bg-light rounded-3 shadow">
        <div className="col-3 border-end p-0 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center p-3">
            <h5 className="m-0">Каналы</h5>
            <button type="button" className="btn btn-link p-0" onClick={openModal}>
              <AddIcon size={20} />
            </button>
          </div>
          <ChannelList />
        </div>
        <div className="col-9 p-0 d-flex flex-column">
          <Chat />
          <SendMessageForm />
        </div>
      </div>
      <NewChannel />
    </div>
  );
};

export default HomePage;
