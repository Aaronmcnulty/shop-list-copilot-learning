import { renderList } from "../renderList/renderList.js";
import { getItems, saveItems } from "../localStorage/localStorage.js";


export function handleAddItemClick() {
  console.log("Add Item button clicked");
  // Get the item name and quantity from the input fields and trim whitespace.
  const nameInput = document.getElementById("item-input");
  const quantityInput = document.getElementById("item-quantity-input");
  const nameValue = nameInput.value.trim();
  const quantityValue = quantityInput.value.trim();
  // If both name and quantity are provided, add the item to the list and update localStorage.
  if (nameValue && quantityValue) {
    const items = getItems("shoppingListItems");
    items.push({ name: nameValue, quantity: quantityValue });
    saveItems("shoppingListItems", items);
    // render the updated list and clear the input fields.
    renderList(getItems, saveItems);
    nameInput.value = "";
    quantityInput.value = "";
  }
}