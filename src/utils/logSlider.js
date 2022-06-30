export function getLogFromPosition(position = 1, minValue, maxValue) {
  const minp = minValue;
  const maxp = maxValue;

  let minv = Math.log(minValue);

  if (!isFinite(minv)) {
    minv = 0;
  }
  const maxv = Math.log(maxValue);

  const scale = (maxv - minv) / (maxp - minp);

  const result = Math.exp(minv + scale * (position - minp));

  return isFinite(result) ? Number(result.toFixed()) : 0;
}

export function getPositionFromLog(value = 1, minValue, maxValue) {
  const minp = minValue;
  const maxp = maxValue;

  let minv = Math.log(minValue);

  if (!isFinite(minv)) {
    minv = 0;
  }

  const maxv = Math.log(maxValue);

  const scale = (maxv - minv) / (maxp - minp);



  const result = (Math.log(value) - minv) / scale + minp;

  return isFinite(result) ? Number(result.toFixed()) : 0;
}

// export function getLogFromPosition(position, maxValue) {
//   return Math.pow(position, Math.E) * maxValue;
// }
//
// export function getPositionFromLog(value, maxValue) {
//   return Math.pow(value / maxValue, 1 / Math.E);
// }
