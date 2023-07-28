import { createPhotos } from './data.js';

const photoCardTemplate = document.querySelector('#picture').content.querySelector('.picture');

const photoCardFragment = document.createDocumentFragment();

const photos = createPhotos();

photos.forEach(({url, description, likes, comments}, index) => {
  const photoCard = photoCardTemplate.cloneNode(true);
  photoCard.querySelector('.picture__img').src = url;
  photoCard.querySelector('.picture__img').alt = description;
  photoCard.querySelector('.picture__likes').textContent = likes;
  photoCard.querySelector('.picture__comments').textContent = comments.length;
  photoCard.setAttribute('data-index', index);
  photoCardFragment.append(photoCard);
});

document.querySelector('.pictures').append(photoCardFragment);

export { photoCardFragment, photos };
