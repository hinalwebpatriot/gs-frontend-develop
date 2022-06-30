export default function formatBackendValidation(data) {
  const keys = Object.keys(data);
  let formattedObj = {};

  keys.forEach(key => {
    formattedObj[key] = data[key].join(" ");
  });

  return formattedObj;
}
