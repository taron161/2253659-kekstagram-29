const lengthTxt = 18;
const txt = prompt('Проверка на колическтво символов');

function isValid (str, lengthStr) {
  return str.length <= lengthStr;
}

console.log(isValid(txt, lengthTxt));

function isPolindrome (str) {
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
}

console.log(isPolindrome(txt));
