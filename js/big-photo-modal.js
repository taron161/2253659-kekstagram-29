import { photos } from './photos.js';
import { isEnterKey, isEscapeKey } from './util.js';
import { addComments, checkQuantityOfComment } from './comments.js';

const COMMENTS_LOAD_COUNT = 5;

const modal = document.querySelector('.big-picture');

const picturesList = document.querySelector('.pictures');

const closeButton = modal.querySelector('.big-picture__cancel');

const loaderButton = modal.querySelector('.comments-loader');

const bigPicture = modal.querySelector('.big-picture__img img');
const likesCount = modal.querySelector('.likes-count');
const commentsCount = modal.querySelector('.comments-count');
const photoDescription = modal.querySelector('.social__caption');
const commentsContainer = modal.querySelector('.social__comments');

let targetComments = [];
let currentCount = COMMENTS_LOAD_COUNT;
let totalCount;

const setModalData = ({ url, description, likes, comments }) => {
  bigPicture.src = url;
  bigPicture.alt = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  photoDescription.textContent = description;
};

const resetModalData = () => {
  bigPicture.src = '';
  likesCount.innerHTML = '';
  commentsCount.innerHTML = '';
  photoDescription.innerHTML = '';
  commentsContainer.innerHTML = '';
};

resetModalData();

const onEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const onEnterKeydown = (evt) => {
  if (isEnterKey(evt)) {
    if (evt.target.classList.contains('picture')) {
      evt.preventDefault();
      const photoId = evt.target.dataset.id;
      const photo = photos.find((item) => item.id === Number(photoId));
      openModal(photo);
    }
  }
};

function closeModal () {
  resetModalData();

  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeKeydown);
  currentCount = COMMENTS_LOAD_COUNT;
}

function openModal (photo) {
  document.body.classList.add('modal-open');
  modal.classList.remove('hidden');

  document.addEventListener('keydown', onEscapeKeydown);

  targetComments = photo.comments.slice();
  totalCount = targetComments.length;

  setModalData(photo);

  addComments(targetComments, 0, COMMENTS_LOAD_COUNT);
  checkQuantityOfComment(totalCount, currentCount);
}


loaderButton.addEventListener('click', () => {
  currentCount += COMMENTS_LOAD_COUNT;
  checkQuantityOfComment(totalCount, currentCount);

  addComments(targetComments, currentCount - COMMENTS_LOAD_COUNT, currentCount);
});

picturesList.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    const photoId = evt.target.parentElement.dataset.id;
    const photo = photos.find((item) => item.id === Number(photoId));
    openModal(photo);
  }
});

picturesList.addEventListener('keydown', onEnterKeydown);

closeButton.addEventListener('click', () => {
  closeModal();
});

closeButton.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeModal();
  }
});
