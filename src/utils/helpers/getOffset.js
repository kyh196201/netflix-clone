import { isHTMLElement } from "@/utils/helpers/index";

function getOffset(element) {
  console.log(element);

  if (!isHTMLElement) {
    throw new TypeError(`${element} is not html element!`);
  }

  const clientRect = element.getBoundingClientRect();

  const relativeTop = clientRect.top;
  const relativeLeft = clientRect.left;

  const top = (pageYOffset || scrollY) + relativeTop;
  const left = (pageXOffset || scrollX) + relativeLeft;

  return {
    top,
    left,
    width: clientRect.width,
    height: clientRect.height,
  };
}

export default getOffset;
