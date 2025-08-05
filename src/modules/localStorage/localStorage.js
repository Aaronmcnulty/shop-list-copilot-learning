const shoppingListKey = "shoppingListItems";

/*
  Functions to manage shopping list items in localStorage
  This module provides functions to get and save items in localStorage
*/

/*
  Get items from localStorage
  If no items are stored, return the empty array.
*/
export function getItems() {
  const items = localStorage.getItem(shoppingListKey);
  return items ? JSON.parse(items) : [];
}

/* 
  Saves items to localStorage. The items should be an empty array or an array of strings.
  The function converts the array to a JSON string before saving.
*/
export function saveItems(items) {
  localStorage.setItem(shoppingListKey, JSON.stringify(items));
}
