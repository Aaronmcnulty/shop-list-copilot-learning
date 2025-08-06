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

  document.getElementById("add-item-button").onclick = function(){
      const nameInput = document.getElementById("item-input");
      const quantityInput = document.getElementById("item-quantity-input");
      const nameValue = nameInput.value.trim();
      const quantityValue = quantityInput.value.trim();
      nameInput.value = "";
      quantityInput.value = "";
      handleAddItemClick({nameValue, quantityValue});   
  } 





// On page load, render the shopping list from localStorage.
document.addEventListener("DOMContentLoaded", function () {
  renderList(getItems, saveItems);
  
});


