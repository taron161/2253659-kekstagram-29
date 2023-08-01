import { preview } from './effects.js';

const modal = document.querySelector('.img-upload__overlay');

const scaleInput = modal.querySelector('.scale__control--value');

const scaleControlSmaller = modal.querySelector('.scale__control--smaller');

const scaleControlBigger = modal.querySelector('.scale__control--bigger');

let scaleValue = 100;

const setPreviewScale = (value) => {
  scaleInput.value = `${value}'%`;
  preview.style.transform = `scale(${value}%)`;
  scaleValue = value;
};

scaleControlSmaller.addEventListener('click', () => {
  if (scaleValue >= 50) {
    scaleValue -= 25;
    setPreviewScale(scaleValue);
  }
});

scaleControlBigger.addEventListener('click', () => {
  if (scaleValue <= 75) {
    scaleValue += 25;
    setPreviewScale(scaleValue);
  }
});

export { setPreviewScale };
