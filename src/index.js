import { renderList } from "./modules/render.js";
import { getItems, saveItems } from "./modules/localStorage/localStorage.js";

// Entry point for the shopping list app
// Shopping List App with localStorage
console.log("Shopping List App is initializing...");

/*
  Add event listener to the "Add Item" button.  
  When clicked, it retrieves the item name and quantity from the input fields,
  adds the item to the shopping list, saves it to localStorage, and re-renders
  the list.
*/ 
document.getElementById("add-item-button").onclick = function () {
  // Get the item name and quantity from the input fields and trim whitespace.
  const nameInput = document.getElementById("item-input");
  const quantityInput = document.getElementById("item-quantity-input");
  const nameValue = nameInput.value.trim();
  const quantityValue = quantityInput.value.trim();
  // If both name and quantity are provided, add the item to the list and update localStorage.
  if (nameValue && quantityValue) {
    const items = getItems();
    items.push({ name: nameValue, quantity: quantityValue});
    saveItems(items);
  // render the updated list and clear the input fields.
    renderList(getItems, saveItems);
    nameInput.value = "";
    quantityInput.value = "";
  }
};

// On page load, render the shopping list from localStorage.
window.onload = function () {
  renderList(getItems, saveItems);
};

