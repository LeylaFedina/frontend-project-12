import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { closeDeleteChannelModal, deleteChannel, deleteMessage } from '../../features/chatSlice';

const DeleteChannel = () => {
  const dispatch = useDispatch();

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
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Вы уверены?</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModal} variant="secondary">
          Отмена
        </Button>
        <Button
          onClick={() => {
            confirmDelete(channelToDelete);
          }}
          variant="danger"
        >
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteChannel;
