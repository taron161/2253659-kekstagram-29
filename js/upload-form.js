import { isEscapeKey } from './util.js';

const MAX_HASHTAG_COUNT = 5;

const VALID_HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const uploadInput = document.querySelector('.img-upload__input');

const modal = document.querySelector('.img-upload__overlay');

const form = document.querySelector('.img-upload__form');

const scaleInput = modal.querySelector('.scale__control--value');

const effectLevelInput = modal.querySelector('.effect-level__value');

const effectsContainer = modal.querySelector('.effects__list');

const hashtagsInput = modal.querySelector('.text__hashtags');

const descriptionInput = modal.querySelector('.text__description');

const closeBtn = modal.querySelector('.cancel');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-error'
});

//удаляет двойные пробелы и добавляет элементы в массив
const getHashtags = (str) => str.replace(/\s{2,}/g, ' ').trim().split(' ');

const isValidHashtags = (str) => getHashtags(str).every((item) => VALID_HASHTAG_SYMBOLS.test(item));

const isValidCount = (str) => getHashtags(str).length <= MAX_HASHTAG_COUNT;

const isUniqueHashtags = (str) => {
  const lowerCaseHashtags = getHashtags(str.toLowerCase());
  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};

pristine.addValidator(
  hashtagsInput,
  isValidCount,
  `Максимальное количество хэш-тегов ${MAX_HASHTAG_COUNT}`,
  1,
  true
);

pristine.addValidator(
  hashtagsInput,
  isUniqueHashtags,
  'Хэш-теги не должны повторяться',
  2,
  true
);

pristine.addValidator(
  hashtagsInput,
  isValidHashtags,
  'Хэш-тег должен содержать от 1 до 19 букв или цифр после знака #',
  3,
  true
);

const resetForm = () => {
  uploadInput.value = '';
  scaleInput.value = '100%';
  effectLevelInput.value = '';
  effectsContainer.querySelector('#effect-none').checked = true;
  hashtagsInput.value = '';
  descriptionInput.value = '';
};

const openModal = () => {
  modal.classList.remove('hidden');
  document.addEventListener('keydown', onModalEscapeKeydown);
  hashtagsInput.addEventListener('keydown', onFieldEscKeydown);
  descriptionInput.addEventListener('keydown', onFieldEscKeydown);
  document.body.classList.add('modal-open');
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

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    getHashtags('можно отправлять');
  } else {
    getHashtags('Нельзя отправлять');
  }
});
