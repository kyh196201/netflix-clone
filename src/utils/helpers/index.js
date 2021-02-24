// check obj is html element
// https://stackoverflow.com/questions/384286/how-do-you-check-if-a-javascript-object-is-a-dom-object
export function isHTMLElement(obj) {
  try {
    return obj instanceof HTMLElement;
  } catch (e) {
    return (
      typeof obj === "object" &&
      obj.nodeType === 1 &&
      typeof obj.style === "object" &&
      typeof obj.ownerDocument === "object"
    );
  }
}

// 특정 개수로 배열 잘라서 이중 배열 만들기
export function division(arr, n) {
  var len = arr.length;
  var count = Math.floor(len / n);
  var tmp = [];

  for (var i = 0; i <= count; i++) {
    tmp.push(arr.splice(0, n));
  }

  return tmp;
}
