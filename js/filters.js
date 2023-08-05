import { photos, addPhotosOnPage } from './photos.js';
import { sortDescending, createRandomId, debounce } from './util.js';

const CALLBACK_DELAY = 500;

const filtersContainer = document.querySelector('.img-filters');

const randomBtn = filtersContainer.querySelector('#filter-random');
const defaultBtn = filtersContainer.querySelector('#filter-default');
const discussedBtn = filtersContainer.querySelector('#filter-discussed');

const setFilter = (element) => {
  if (!element.classList.contains('img-filters__button--active')) {
    filtersContainer.querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    element.classList.add('img-filters__button--active');
  }
};

const getRandomPhotos = () => {
  const filteredPhotos = [];
  const randomNumber = createRandomId(0, 24);
  for (let i = 0; i < 10; i++) {
    const id = randomNumber();
    filteredPhotos.push(photos.find((item) => item.id === id));
  }
  return filteredPhotos;
};

const addPhotosLater = debounce(addPhotosOnPage, CALLBACK_DELAY);

randomBtn.addEventListener('click', () => {
  setFilter(randomBtn);
  addPhotosLater(getRandomPhotos());
});

defaultBtn.addEventListener('click', () => {
  setFilter(defaultBtn);
  addPhotosLater(photos);
});

discussedBtn.addEventListener('click', () => {
  setFilter(discussedBtn);
  const filteredPhotos = sortDescending(photos.slice(), 'comments');
  addPhotosLater(filteredPhotos);
});
