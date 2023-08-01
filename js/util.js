// создает случайное число из диапазона
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// генерация случайных неповоторяющихся чисел
const createRandomId = (min, max) => {
  const ArrayOfRandomId = [];

  return function () {
    let currentId = getRandomInteger(min, max);

    if (ArrayOfRandomId.length >= (max - min + 1)) {
      return null;
    }

    while (ArrayOfRandomId.includes(currentId)) {
      currentId = getRandomInteger(min, max);
    }

    ArrayOfRandomId.push(currentId);

    return currentId;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

export{
  getRandomInteger,
  createRandomId,
  getRandomArrayElement,
  isEscapeKey,
  isEnterKey
};
