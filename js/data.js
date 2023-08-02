import { getRandomInteger, createRandomId, getRandomArrayElement } from './util.js';

const USER_NAMES = [
  'Иван',
  'Хуан',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const PHOTO_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const PHOTO_DESCRIPTIONS = [
  'Наконец-то увижу своего кузена',
  'Прощание с летом...',
  'Ауффф. Выкатывает со дворов!',
  'Безумно можно быть первым...',
  'Сразу видно, что нравится моему пушистому другу)',
];

const PHOTOS_COUNT = 25;

const commentId = createRandomId(1, 999);

const photoId = createRandomId(1, PHOTOS_COUNT);

const generateDescription = () => getRandomArrayElement(PHOTO_DESCRIPTIONS);

const generateUrl = (id) => `photos/${id}.jpg`;

const generateLikes = () => getRandomInteger(15, 200);

const generateAvatarUrl = () => `img/avatar-${getRandomInteger(1, 6)}.svg`;

const generateComment = () => ({
  id: commentId(),
  avatar: generateAvatarUrl(),
  message: getRandomArrayElement(PHOTO_COMMENTS),
  name: getRandomArrayElement(USER_NAMES)
});

const createComments = () => Array.from({length: getRandomInteger(0, 30)}, generateComment);

const generateUserPhoto = () => {
  const id = photoId();

  return {
    id: id,
    url: generateUrl(id),
    description: generateDescription(),
    likes: generateLikes(),
    comments: createComments()
  };
};

const createPhotos = () => Array.from({length: PHOTOS_COUNT}, generateUserPhoto);
createPhotos();

export { PHOTOS_COUNT };
