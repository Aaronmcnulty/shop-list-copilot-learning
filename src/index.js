import { renderList } from "./modules/render.js";
import { getItems, saveItems } from "./modules/localStorage/localStorage.js";

// Entry point for the shopping list app
// Shopping List App with localStorage
console.log("Shopping List App is initializing...");

document.getElementById("add-item-button").onclick = function () {
  const nameInput = document.getElementById("item-input");
  const quantityInput = document.getElementById("item-quantity-input");
  const nameValue = nameInput.value.trim();
  const qauntityValue = quantityInput.value.trim();
  if (nameValue && qauntityValue) {
    const items = getItems();
    items.push({ name: nameValue, quantity: qauntityValue});
    saveItems(items);
    renderList(getItems, saveItems);
    nameInput.value = "";
    quantityInput.value = "";
  }
};

window.onload = function () {
  renderList(getItems, saveItems);
};

