const shoppingListKey = "shoppingListItems";

export function getItems() {
  const items = localStorage.getItem(shoppingListKey);
  return items ? JSON.parse(items) : [];
}

export function saveItems(items) {
  localStorage.setItem(shoppingListKey, JSON.stringify(items));
}
