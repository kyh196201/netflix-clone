// json stringify
function s(value) {
  return JSON.stringify(value);
}

// get item from localStorage
export function getItem(key) {
  return localStorage.getItem(key);
}

// set item to localStroage
export function setItem(key, value) {
  localStorage.setItem(key, s(value));
}

export const STORAGE_KEY = {
  my_list: "my_list",
  hate_list: "hate_list",
  like_list: "like_list",
};
