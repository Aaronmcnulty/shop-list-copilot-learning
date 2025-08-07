
/*
  Get items from localStorage
  If no items are stored, return the empty array.
*/
export function getItems(key) {
  const items = localStorage.getItem(key);
 try {
    return items ? JSON.parse(items) : [];
  } catch (e) {
    return [];
  }
}

/* 
  Saves items to localStorage. The items should be an empty array or an array of objects.
  The function converts the array to a JSON string before saving.
*/
export function saveItems(key, value) {
  if (!Array.isArray(value)) {
    throw new Error("Value must be an array.");
  }
  localStorage.setItem(key, JSON.stringify(value));
}
