const modal = document.querySelector('.img-upload__overlay');

const MAX_HASHTAG_COUNT = 5;

const VALID_HASHTAG_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const form = document.querySelector('.img-upload__form');

const hashtagsInput = modal.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-error'
});

//удаляет двойные пробелы и добавляет элементы в массив
const getHashtags = (str) => str.trim().replace(/\s{2,}/g, ' ').split(' ');

const isValidHashtags = (str) => {
  if (str.trim().length === 0) {
    return true;
  } else {
    return getHashtags(str).every((item) => VALID_HASHTAG_SYMBOLS.test(item));
  }
};

const isValidCount = (str) => getHashtags(str).length <= MAX_HASHTAG_COUNT;

const isUniqueHashtags = (str) => {
  const lowerCaseHashtags = getHashtags(str.toLowerCase());
  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};

pristine.addValidator(
  hashtagsInput,
  isValidCount,
  `Максимальное количеств
  о хэш-тегов ${MAX_HASHTAG_COUNT}`
);

pristine.addValidator(
  hashtagsInput,
  isUniqueHashtags,
  'Хэш-теги не должны повторяться'
);

pristine.addValidator(
  hashtagsInput,
  isValidHashtags,
  'Хэш-тег должен содержать от 1 до 19 букв или цифр после знака #'
);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    getHashtags('можно отправлять');
  } else {
    getHashtags('Нельзя отправлять');
  }
});

export { hashtagsInput };
