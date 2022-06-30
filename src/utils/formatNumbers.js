// const fixed = 8;
const maxChars = 12;

const checkLength = x => x.length <= maxChars;

const floatCheckFirstChar = x => /0\d/.test(x.slice(0, 2)) || x[0] === ".";

export const testFloatFromString = x => {
  if (floatCheckFirstChar(x) || /[^0-9.]/g.test(x)) return false;

  const div = x.match(/\./g);

  if (!div) return true;
  return div.length <= 1;
};

export const testIntFromString = x =>
  !((x[0] === "0" && x[1]) || /[^0-9]/g.test(x));

export const validateFloat = x => testFloatFromString(x) && checkLength(x);
export const validateInt = x => testIntFromString(x) && checkLength(x);

// export const zeroAfterDiv = str => ( (str[str.length-1] === '.') ? (str + '0'): (str) )

// export const getFloatPart = str => ( (str.toString().includes('.')) ? (str.toString().split('.').pop().length) : (false) )

export const f = x =>
  x.toString().includes(".")
    ? x
        .toString()
        .split(".")
        .pop().length
    : 0;
// export const checkLengthAfterDiv = x => (Number(x)+1 && f(x) <= fixed);
