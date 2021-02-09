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
