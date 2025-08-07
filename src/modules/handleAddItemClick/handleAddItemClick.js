import { renderList } from "../renderList/renderList.js";
import { getItems, saveItems } from "../localStorage/localStorage.js";

export function handleAddItemClick(nameValue, quantityValue) {

  // Validate input types and throw error for invalid inputs.
  if (typeof nameValue != "string" || typeof quantityValue != "number") {
    throw new Error("Invalid input: nameValue must be a string and quantityValue must be a number.");
  }

  // Validate that name is not empty and quantity is at least 1.
  if (nameValue === '' || quantityValue < 1) {
    throw new Error("Invalid input: Name cannot be empty and quantity must be at least 1.");
  }

  // Get the current items from localStorage, add the new item to the array, and overwrite it 
  // on 'shoppingListItems' in localStorage.
  items.push({ name: nameValue, quantity: quantityValue });
  saveItems("shoppingListItems", items);
  // render the updated list.
  renderList(getItems, saveItems);
}
