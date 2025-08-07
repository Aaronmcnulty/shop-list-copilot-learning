import { renderList } from "./modules/renderList/renderList.js";
import { getItems, saveItems } from "./modules/localStorage/localStorage.js";
import { handleAddItemClick } from "./modules/handleAddItemClick/handleAddItemClick.js";

// Entry point for the shopping list app
// Shopping List App with localStorage
console.log("Shopping List App is initializing...");

/*
  Add event listener to the "Add Item" button.  
  When clicked, it retrieves the item name and quantity from the input fields,
  adds the item to the shopping list, saves it to localStorage, and re-renders
  the list.
*/

document.getElementById("add-item-button").addEventListener("click", function () {
  const nameInput = document.getElementById("item-input");
  const quantityInput = document.getElementById("item-quantity-input");
  const nameValue = nameInput.value.trim();
  const quantityValue = parseInt(quantityInput.value);
  
  const errorMessageElement = document.getElementById("errorMessage");

  errorMessageElement.textContent = ""; // Clear previous errors

  // Validate input types and values and display error messages if necessary
  if (!nameValue) {
    errorMessageElement.textContent = "Name cannot be empty.";
    return;
  }
  if (isNaN(quantityValue)) {
    errorMessageElement.textContent = "Quantity must be a number.";
    return;
  }
  if (quantityValue < 1) {
    errorMessageElement.textContent = "Quantity must be at least 1.";
    return;
  }

  try {
    handleAddItemClick(nameValue, quantityValue);
    nameInput.value = ""; // Reset name input field
    quantityInput.value = 1; // Reset quantity to default value
  } catch (err) {
    errorMessageElement.textContent = "Failed to add item. Please try again.";
    console.error(err);
  }
})

// On page load, render the shopping list from localStorage.
document.addEventListener("DOMContentLoaded", function () {
  renderList(getItems, saveItems);
});
