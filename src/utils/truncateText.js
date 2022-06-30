export default function truncateText(str, limit = 100, ellipsis = true) {
  if (str.length > limit) {
    return str.slice(0, limit) + (ellipsis ? "..." : "");
  } else {
    return str;
  }
}
