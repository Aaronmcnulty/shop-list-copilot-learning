import { capitalizeFirstLetter } from './utils/helpers.js';
import { renderList } from './render.js';

// Entry point for the shopping list app

// Shopping List App with localStorage
const shoppingListKey = 'shoppingListItems';

function getItems() {
  const items = localStorage.getItem(shoppingListKey);
  return items ? JSON.parse(items) : [];
}

function saveItems(items) {
  localStorage.setItem(shoppingListKey, JSON.stringify(items));
}

// ...existing code...

document.getElementById('add-item-button').onclick = function() {
  const input = document.getElementById('item-input');
  const value = input.value.trim();
  if (value) {
    const items = getItems();
    items.push(value);
    saveItems(items);
    renderList(getItems, saveItems);
    input.value = '';
  }
};

window.onload = function() {
  renderList(getItems, saveItems);
};
