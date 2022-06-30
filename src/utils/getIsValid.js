export function getIsValid(state, server) {
  let isValid = state === "none" ? true : state;

  if (state !== "none" && server.length) {
    isValid = false;
  }

  return isValid;
}
