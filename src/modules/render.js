import { capitalizeFirstLetter } from './utils/helpers.js';


export function renderList(getItems, saveItems) {
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
      renderList(getItems, saveItems);
    };
    li.appendChild(removeBtn);
    ul.appendChild(li);
  });
  listDiv.appendChild(ul);
}

