import { isEscapeKey } from './util.js';
import { setPreviewScale } from './scale.js';
import { hashtagsInput } from './validator.js';
import { resetEffects } from './effects.js';

const uploadInput = document.querySelector('.img-upload__input');

const modal = document.querySelector('.img-upload__overlay');

const closeBtn = modal.querySelector('.cancel');

const descriptionInput = modal.querySelector('.text__description');

const resetForm = () => {
  uploadInput.value = '';
  hashtagsInput.value = '';
  descriptionInput.value = '';
  setPreviewScale(100);
  resetEffects();
};

const openModal = () => {
  modal.classList.remove('hidden');
  document.addEventListener('keydown', onModalEscapeKeydown);
  hashtagsInput.addEventListener('keydown', onFieldEscKeydown);
  descriptionInput.addEventListener('keydown', onFieldEscKeydown);
  document.body.classList.add('modal-open');
  resetEffects();
};

const closeModal = () => {
  modal.classList.add('hidden');
  resetForm();
  document.removeEventListener('keydown', onModalEscapeKeydown);
  document.body.classList.remove('modal-open');
};

uploadInput.addEventListener('change', () => {
  openModal();
});

closeBtn.addEventListener('click', () => {
  closeModal();
});

function onFieldEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

function onModalEscapeKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

export { modal };
