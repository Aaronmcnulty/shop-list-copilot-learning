import { renderList } from "../renderList/renderList.js";
import { getItems, saveItems } from "../localStorage/localStorage.js";


export function handleAddItemClick(nameValue, quantityValue) {

  // If both name and quantity are provided, add the item to the list and update localStorage.
  if (nameValue && quantityValue) {
    const items = getItems("shoppingListItems");
    if (!Array.isArray(items)) {
      throw new Error("Expected items to be an array");
    }
    items.push({ name: nameValue, quantity: quantityValue });
    saveItems("shoppingListItems", items);
    // render the updated list.
    renderList(getItems, saveItems);
  }
}