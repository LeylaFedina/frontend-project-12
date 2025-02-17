import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import { CgArrowRightR as SendIcon } from 'react-icons/cg';

import { postMessage } from '../../../features/chatSlice';

const SendMessageForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { t } = useTranslation();

  const form = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      if (form.values.message.trim() !== '') {
        const inputElement = inputRef.current;
        inputElement.disabled = true;
        dispatch(postMessage(values.message)).finally(() => {
          inputElement.disabled = false;
          inputElement.focus();
        });
        form.values.message = '';
        inputElement.value = '';
      }
    },
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="mt-auto px-5 py-3">
      <form onSubmit={form.handleSubmit} noValidate="" className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <input
            id="message"
            name="message"
            aria-label="Новое сообщение"
            placeholder={t('chat.form.placeholder')}
            className="border-0 p-0 ps-2 form-control"
            onChange={form.handleChange}
            value={form.values.message}
            ref={inputRef}
          />
          <button type="submit" disabled="" className="btn btn-group-vertical">
            <SendIcon size="1.5rem" />
            <span className="visually-hidden">{t('chat.form.sendBtn')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendMessageForm;
