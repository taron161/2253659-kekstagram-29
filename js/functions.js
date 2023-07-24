const lengthTxt = 18;
const txt = 'Проверка на колическтво символов';

const isValid = (str, lengthStr) => str.length <= lengthStr;

isValid(txt ,lengthTxt);

const isPalindrome = (str) => {
  let newStr = str.toLowerCase();
  str = newStr;
  newStr = str.replaceAll(' ', '');
  str = newStr;
  for (let i = 0; i <= str.length / 2; i++) {
    if (str[i] !== str[(str.length - 1) - i]) {
      return false;
    }
  }
  return true;
};

isPalindrome(txt);

// функция вычисляет, укладывается ли встреча в рабочее время или нет
/*
'startDay' - начало рабочего дня
'endDay' - конец рабочего дня
'meetingStart' - начало встречи
'meetingDuration' - продолжительность встречи в минутах
*/
const isDuringBusinessHours = (startDay, endDay, meetingStart, meetingDuration) => {
  let tmp = startDay;
  startDay = tmp.split(':');

  tmp = endDay;
  endDay = tmp.split(':');

  tmp = meetingStart;
  meetingStart = tmp.split(':');

  const startDayInMinutes = Number(startDay[0]) * 60 + Number(startDay[1]);

  const endDayInMinutes = Number(endDay[0]) * 60 + Number(endDay[1]);

  const meetingStartInMinutes = Number(meetingStart[0]) * 60 + Number(meetingStart[1]);

  if (startDayInMinutes <= meetingStartInMinutes && meetingStartInMinutes <= endDayInMinutes) {
    const timeLeft = endDayInMinutes - meetingStartInMinutes;

    if (timeLeft >= meetingDuration) {
      return true;
    }
  }
  return false;
};

isDuringBusinessHours('09:20', '17:00', '16:30', 30);
