import {  capitalizeFirstLetter } from './utils/helpers.js';

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

function renderList() {
  const items = getItems();
  const listDiv = document.getElementById('shopping-list');
  listDiv.innerHTML = '';
  if (items.length === 0) {
    listDiv.innerHTML = '<p>No items yet.</p>';
    return;
  }
  const ul = document.createElement('ul');
  items.forEach((item, idx) => {
    const li = document.createElement('li');
    li.textContent = capitalizeFirstLetter(item);
    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.style.marginLeft = '8px';
    removeBtn.onclick = () => {
      const updated = getItems();
      updated.splice(idx, 1);
      saveItems(updated);
      renderList();
    };
    li.appendChild(removeBtn);
    ul.appendChild(li);
  });
  listDiv.appendChild(ul);
}

document.getElementById('add-item-button').onclick = function() {
  const input = document.getElementById('item-input');
  const value = input.value.trim();
  if (value) {
    const items = getItems();
    items.push(value);
    saveItems(items);
    renderList();
    input.value = '';
  }
};

window.onload = renderList;
