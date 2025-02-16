import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { closeDeleteChannelModal, deleteChannel, deleteMessage } from '../../../features/chatSlice';

const RemoveChannel = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const messages = useSelector((state) => state.chat.messages);
  const channelToDelete = useSelector((state) => state.chat.ui.modals.deleteChannel.channelId);
  const isModalOpen = useSelector((state) => state.chat.ui.modals.deleteChannel.isOpen);

  const closeModal = () => {
    dispatch(closeDeleteChannelModal());
  };

  const confirmDelete = (channelId) => {
    const messageIdsToDelete = messages.ids.filter(
      (messageId) => messages.entities[messageId].channelId === channelId,
    );

    dispatch(deleteChannel(channelId));
    closeModal();

    messageIdsToDelete.forEach((id) => {
      const message = messages.entities[id];
      dispatch(deleteMessage(message.id));
    });
  };

  return (
    <Modal show={isModalOpen} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.deleteModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{t('chat.deleteModal.desription')}</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModal} variant="secondary">
          {t('chat.deleteModal.cancelBtn')}
        </Button>
        <Button
          onClick={() => {
            confirmDelete(channelToDelete);
          }}
          variant="danger"
        >
          {t('chat.deleteModal.sendBtn')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannel;
