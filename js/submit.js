import { sendData } from './api.js';
import { closeModal, onModalEscapeKeydown } from './upload-form.js';
import { isEscapeKey } from './util.js';

const SUCCESS_MODAL_ID = '#success';
const ERROR_MODAL_ID = '#error';

const submitButton = document.querySelector('.img-upload__submit');

let selectedModalElement;

const openModal = (id) => {
  const modalTemplate = document.querySelector(id).content.children[0];
  const modal = modalTemplate.cloneNode(true);
  const closeBtn = modal.querySelector('button');
  selectedModalElement = modal;

  document.body.append(modal);
  document.removeEventListener('keydown', onModalEscapeKeydown);

  closeBtn.addEventListener('click', () => {
    removeEventsAndModal();
  });

  document.addEventListener('click', onClickEmptySpace);

  document.addEventListener('keydown', onEscapeKeydown);
};

function removeEventsAndModal() {
  document.addEventListener('keydown', onModalEscapeKeydown);
  document.removeEventListener('click', onClickEmptySpace);
  document.removeEventListener('keydown', onEscapeKeydown);

  selectedModalElement.remove();
}

function onEscapeKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeEventsAndModal();
  }
}

function onClickEmptySpace(evt) {
  if (!evt.target.closest('.error__inner') && !evt.target.closest('.success__inner')) {
    removeEventsAndModal();
  }
}

const isSendingData = (isSending) => {
  if (isSending) {
    submitButton.disabled = true;
    submitButton.textContent = 'Отправка...';
  } else {
    submitButton.disabled = false;
    submitButton.textContent = 'Опубликовать';
  }
};

const onSubmitSuccess = () => {
  closeModal();
  isSendingData(false);
  openModal(SUCCESS_MODAL_ID);
};

const onSubmitFail = () => {
  isSendingData(false);
  openModal(ERROR_MODAL_ID);
};

const submitData = async (data) => {
  isSendingData(true);
  try {
    await sendData(data);
    onSubmitSuccess();
  } catch {
    onSubmitFail();
  }
};

export { submitData };
