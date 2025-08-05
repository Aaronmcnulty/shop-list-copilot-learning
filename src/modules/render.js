import { capitalizeFirstLetter } from "../utils/helpers.js";

export function renderList(getItems, saveItems) {
  const items = getItems();
  const listDiv = document.getElementById("shopping-list");
  listDiv.innerHTML = "";
  if (items.length === 0) {
    listDiv.innerHTML = "<p class='no-items-text'>No items yet.</p>";
    return;
  }
  const ul = document.createElement("ul");
  ul.className = "shopping-list-ul";
  items.forEach((item, idx) => {
    const li = document.createElement("li");
    li.className = "shopping-list-item";
    
    // Item details container
    const itemDetails = document.createElement("div");
    itemDetails.className = "item-details";
    
    // Item name
    const itemName = document.createElement("span");
    itemName.className = "item-name";
    itemName.textContent = capitalizeFirstLetter(typeof item === 'object' ? item.name : item);
    
    
// Quantity input
    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.className = "item-quantity";
    quantityInput.id = "list-item-quantity";
    quantityInput.value = typeof item === 'object' ? item.quantity : 1;
    quantityInput.min = 1;
    quantityInput.addEventListener('change', (e) => {
      const items = getItems();
      items[idx] = { 
        name: typeof items[idx] === 'object' ? items[idx].name : items[idx],
        quantity: parseInt(e.target.value) || 1
      };
      saveItems(items);
    });
  
    
    itemDetails.appendChild(itemName);
    itemDetails.appendChild(quantityInput);
    li.appendChild(itemDetails);
    
    // Remove button
    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-item-button";
    removeBtn.textContent = "Remove";
    removeBtn.style.marginLeft = "8px";
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
