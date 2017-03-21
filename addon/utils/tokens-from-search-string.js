export default function(searchString) {
  let replacedString = searchString
    .replace(/(?:\r\n|\r|\n)/g, '|')
    .replace(/\s*(\(|\))\s*/g, '')
    .replace(/[\s\n]+/g, '|');
  return replacedString.split('|');
}
