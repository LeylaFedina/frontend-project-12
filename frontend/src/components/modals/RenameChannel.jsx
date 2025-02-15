import * as yup from 'yup';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setLocale } from 'yup';

import { setChannelAdditionSuccess, setChannelAdditionFailure } from '../../features/validationSlice';
import { closeRenameChannelModal, renameChannel } from '../../features/chatSlice';

const RenameChannel = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channelId = useSelector((state) => state.chat.ui.modals.renameChannel.channelId);
  const validation = useSelector((state) => state.validation.addingChannel);
  const channelIds = useSelector((state) => state.chat.channels.ids);
  const channels = useSelector((state) => state.chat.channels.entities);
  const existingNames = channelIds.map((id) => channels[id].name);
  const currentChannelName = channels[channelId]?.name;

  const isModalOpen = useSelector((state) => state.chat.ui.modals.renameChannel.isOpen);

  const customMessages = {
    mixed: {
      required: t('validation.emptyField'),
    },
    string: {
      min: ({ min }) => (min === 3 ? t('validation.length') : t('validation.min')),
      max: t('validation.length'),
      oneOf: t('validation.passwordConfirmation'),
      notOneOf: t('validation.uniqName'),
    },
  };

  setLocale(customMessages);

  const validationSchema = yup.object().shape({
    name: yup.string().required().min(3).max(20).notOneOf(existingNames, t('validation.uniqName')),
  });

  const form = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: ({ name }) => {
      const updatedName = { name: name.trim() };
      validationSchema
        .validate(updatedName)
        .then(() => {
          dispatch(setChannelAdditionSuccess(updatedName));
          dispatch(renameChannel({ id: channelId, updatedName }));
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
    if (isModalOpen && channelId) {
      form.setValues({ name: currentChannelName });

      setTimeout(() => {
        inputRef.current.focus();
        inputRef.current.select();
      }, 0);
    }
  }, [isModalOpen, currentChannelName, channelId]);

  return (
    <Modal show={isModalOpen} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.renameModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={form.handleSubmit}>
          <Form.Group controlId="channelName">
          <Form.Label htmlFor="name" className="visually-hidden">
              {t('chat.renameModal.formLabel')}
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              id="name"
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
        {t('chat.renameModal.cancelBtn')}
        </Button>
        <Button variant="primary" onClick={form.handleSubmit}>
        {t('chat.renameModal.sendBtn')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RenameChannel;
