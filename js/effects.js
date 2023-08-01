const EFFECTS = {
  none: {
    effect: 'none',
    reset: () => {
      resetEffects();
    }
  },

  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    effect: 'grayscale',
    unit: ''
  },

  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    effect: 'sepia',
    unit: ''
  },

  marvin: {
    min: 0,
    max: 100,
    step: 1,
    effect: 'invert',
    unit: '%'
  },

  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    effect: 'blur',
    unit: 'px'
  },

  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    effect: 'brightness',
    unit: ''
  },
};

const modal = document.querySelector('.img-upload__overlay');

const preview = modal.querySelector('.img-upload__preview img');

const sliderFieldset = modal.querySelector('.effect-level');

const sliderInput = modal.querySelector('.effect-level__value');

const sliderContainer = modal.querySelector('.effect-level__slider');

const effectsContainer = modal.querySelector('.effects__list');

const sliderSetting = {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  effect: 'none',
  value: 1,
  unit: ''
};

noUiSlider.create(sliderContainer, sliderSetting);

sliderContainer.noUiSlider.on('update', () => {
  sliderSetting.value = sliderContainer.noUiSlider.get();
  preview.style.filter = `${sliderSetting.effect}(${sliderSetting.value}${sliderSetting.unit})`;
  sliderInput.value = sliderSetting.value;
});

const setEffect = ({ effect, min, max, step, unit = '' }) => {
  sliderFieldset.classList.remove('hidden');
  sliderSetting.range.min = min;
  sliderSetting.range.max = max;
  sliderSetting.step = step;
  sliderSetting.start = max;
  sliderSetting.unit = unit;
  sliderSetting.effect = effect;
  sliderInput.value = max;
  sliderContainer.noUiSlider.updateOptions(sliderSetting);
};

function resetEffects () {
  sliderFieldset.classList.add('hidden');
  preview.style.filter = 'none';
  sliderInput.value = '';
  modal.querySelector('#effect-none').checked = true;
}

effectsContainer.addEventListener('change', (evt) => {
  if (evt.target.value === 'none') {
    EFFECTS[evt.target.value].reset();
  } else {
    setEffect(EFFECTS[evt.target.value]);
  }
});

export { preview, resetEffects };
