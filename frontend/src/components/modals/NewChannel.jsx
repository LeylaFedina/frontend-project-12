import * as yup from 'yup';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChannelAdditionSuccess, setChannelAdditionFailure } from '../../features/validationSlice';
import { closeRenameChannelModal, postChannel } from '../../features/chatSlice';
import { useTranslation } from 'react-i18next';

const NewChannel = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const validation = useSelector((state) => state.validation.addingChannel);
  const channelIds = useSelector((state) => state.chat.channels.ids);
  const channels = useSelector((state) => state.chat.channels.entities);
  const existingNames = channelIds.map((id) => channels[id].name);

  const isModalOpen = useSelector((state) => state.chat.ui.modals.postChannel.isOpen);

  const validationSchema = yup.object().shape({
    name: yup.string().required().min(3).max(20).notOneOf(existingNames),
  });

  const form = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: ({ name }) => {
      const newChannelName = { name: name.trim() };
      validationSchema
        .validate(newChannelName)
        .then(() => {
          dispatch(setChannelAdditionSuccess(newChannelName));
          dispatch(postChannel(newChannelName));
          closeModal();
        })
        .catch((error) => dispatch(setChannelAdditionFailure(error)));
    },
  });

  const closeModal = () => {
    dispatch(closeRenameChannelModal());
    form.resetForm();
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModalOpen]);

  return (
    <Modal show={isModalOpen} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.addModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={form.handleSubmit}>
          <Form.Group controlId="channelName">
            <Form.Label>{t('chat.addModal.desription')}</Form.Label>
            <Form.Control
              type="text"
              name="name"
              isInvalid={validation.status === 'failed'}
              value={form.values.name}
              onChange={form.handleChange}
              ref={inputRef}
            />
            <Form.Control.Feedback type="invalid">{validation.error}</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
        {t('chat.addModal.cancelBtn')}
        </Button>
        <Button variant="primary" onClick={form.handleSubmit}>
        {t('chat.addModal.sendBtn')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewChannel;
