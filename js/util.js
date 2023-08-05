const ALERT_SHOW_TIME = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert-container');

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomId = (min, max) => {
  const randomNumbers = [];

  return function () {
    let currentId = getRandomInteger(min, max);
    if (randomNumbers.length >= (max - min + 1)) {
      return null;
    }
    while (randomNumbers.includes(currentId)) {
      currentId = getRandomInteger(min, max);
    }
    randomNumbers.push(currentId);
    return currentId;
  };
};

const sortDescending = (items, key) => {
  items.sort((a, b) => {
    if (a[key].length < b[key].length) {
      return 1;
    }
    if (a[key].length > b[key].length) {
      return -1;
    }
    return 0;
  });
  return items;
};

function debounce(callback, timeoutDelay) {
  let timeoutId;
  return function(...rest) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export{
  isEscapeKey,
  isEnterKey,
  showAlert,
  sortDescending,
  createRandomId,
  debounce
};
