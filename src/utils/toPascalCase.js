export default function toPascalCase(str) {
  const words = str.split('-').map(word => word[0].toUpperCase() + word.slice(1));
  return words.join(' ');
}
