
/*
  Get items from localStorage
  If no items are stored, return the empty array.
*/
export function getItems(key) {
  const items = localStorage.getItem(key);
  return items ? JSON.parse(items) : [];
}

/* 
  Saves items to localStorage. The items should be an empty array or an array of strings.
  The function converts the array to a JSON string before saving.
*/
export function saveItems(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
