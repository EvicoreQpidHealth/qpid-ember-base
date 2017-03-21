/* globals colorbrewer */

function hashCode(string) {
  let hash = 0;
  let i, chr, len;
  if (string.length === 0) {
    return hash;
  }
  for (i = 0, len = string.length; i < len; i++) {
    chr   = string.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export function textToColor(text) {
  return colorbrewer.Set3[12][hashCode(text) % 12];
}
