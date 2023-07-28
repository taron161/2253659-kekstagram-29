import { photos } from './photos.js';
import { isEnterKey, isEscapeKey } from './util.js';

const modal = document.querySelector('.big-picture');

const picturesList = document.querySelector('.pictures');

const closeButton = modal.querySelector('.big-picture__cancel');

// Передает данные выбранного объекта в модальное окно
const setModalData = ({url, description, likes, comments}) => {
  modal.querySelector('.big-picture__img img').src = url;
  modal.querySelector('.big-picture__img img').alt = description;
  modal.querySelector('.likes-count').textContent = likes;
  modal.querySelector('.comments-count').textContent = comments.length;
  modal.querySelector('.social__caption').textContent = description;
};

// Функция для события при нажатии на Esc
const onModalEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

// Функция для события при нажатии на Enter
const onPhotoEnterKeydown = (evt) => {
  if (isEnterKey(evt)) {
    if (evt.target.classList.contains('picture')) {
      evt.preventDefault();
      const photoIndex = evt.target.dataset.index;
      setModalData(photos[photoIndex]);
      openModal();
    }
  }
};

// Закрывает модальное окно и сбрасывает данные об объекте
function closeModal () {
  modal.querySelector('.big-picture__img img').innerHTML = '';
  modal.querySelector('.likes-count').innerHTML = '';
  modal.querySelector('.comments-count').innerHTML = '';
  modal.querySelector('.social__caption').innerHTML = '';

  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onModalEscapeKeydown);
}

// Открывает модальное окно
function openModal () {
  document.body.classList.add('modal-open');
  modal.classList.remove('hidden');

  document.addEventListener('keydown', onModalEscapeKeydown);
}

// Событие при нажатии на превью
picturesList.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    const photoIndex = evt.target.parentElement.dataset.index;
    setModalData(photos[photoIndex]);
    openModal();
  }
});

picturesList.addEventListener('keydown', onPhotoEnterKeydown);

// Событие при нажатии на крестик в модальном окне
closeButton.addEventListener('click', () => {
  closeModal();
});

closeButton.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeModal();
  }
});
