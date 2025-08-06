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
const t = document.getElementById("add-item-button").onclick = function () {
  handleAddItemClick();
};



// On page load, render the shopping list from localStorage.
window.onload = function () {
  renderList(getItems, saveItems);
};
