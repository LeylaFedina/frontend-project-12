import { FaPlus as AddIcon } from 'react-icons/fa';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import { setUser } from '../../features/loginSlice';
import {
  getChannels,
  getMessages,
  openAddChannelModal,
  clearError,
  setChannelAdded,
  setChannelRenamed,
  setChannelDeleted,
} from '../../features/chatSlice';
import ChannelList from '../../components/ChannelList/ChannelList';
import Chat from '../../components/Chat/Chat';
import SendMessageForm from '../../components/forms/SendMessageForm';
import NewChannel from '../../components/modals/NewChannel';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
  const serverErrors = useSelector((state) => state.chat.error);

  const openModal = () => {
    dispatch(openAddChannelModal());
  };

  useEffect(() => {
    toast.error(serverErrors, {
      theme: 'colored',
      pauseOnFocusLoss: false,
      hideProgressBar: true,
      position: 'bottom-right',
    });
  }, [serverErrors, dispatch]);

  const channelAdded = useSelector((state) => state.chat.ui.modals.addChannel.isChannelAdded);
  const channelDeleted = useSelector((state) => state.chat.ui.modals.deleteChannel.isChannelDeleted);
  const channelRenamed = useSelector((state) => state.chat.ui.modals.renameChannel.isChannelRenamed);

  useEffect(() => {
    if (serverErrors) {
      toast.error(t(serverErrors), {
        theme: 'colored',
        pauseOnFocusLoss: false,
        hideProgressBar: true,
        position: 'bottom-right',
      });
      dispatch(clearError());
    }
  }, [serverErrors, dispatch]);
  useEffect(() => {
    if (channelAdded) {
      toast.success(t('chat.addModal.notification'), {
        theme: 'colored',
        pauseOnFocusLoss: false,
        hideProgressBar: true,
        position: 'bottom-right',
      });
      dispatch(setChannelAdded(false));
    }
    if (channelDeleted) {
      toast.success(t('chat.deleteModal.notification'), {
        theme: 'colored',
        pauseOnFocusLoss: false,
        hideProgressBar: true,
        position: 'bottom-right',
      });
      dispatch(setChannelDeleted(false));
    }
    if (channelRenamed) {
      toast.success(t('chat.renameModal.notification'), {
        theme: 'colored',
        pauseOnFocusLoss: false,
        hideProgressBar: true,
        position: 'bottom-right',
      });
      dispatch(setChannelRenamed(false));
    }
  }, [channelAdded, channelDeleted, channelRenamed, dispatch]);

  return (
    <div className="container-fluid h-100 p-3">
      <div className="row h-100 bg-light rounded-3 shadow">
        <div className="col-3 border-end p-0 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center p-3">
            <h5 className="m-0">{t('chat.channels.title')}</h5>
            <button type="button" className="btn btn-link p-0" onClick={openModal}>
              <AddIcon size={20} />
              <span className="visually-hidden">{t('chat.channels.addBtn')}</span>
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
      <ToastContainer />
    </div>
  );
};

export default HomePage;
