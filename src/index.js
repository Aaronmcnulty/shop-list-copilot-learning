import { renderList } from "./modules/render.js";
import { getItems, saveItems } from "./modules/localStorage.js";

// Entry point for the shopping list app
// Shopping List App with localStorage
console.log("Shopping List App is initializing...")


document.getElementById("add-item-button").onclick = function () {
  const input = document.getElementById("item-input");
  const value = input.value.trim();
  if (value) {
    const items = getItems();
    items.push(value);
    saveItems(items);
    renderList(getItems, saveItems);
    input.value = "";
  }
};

window.onload = function () {
  renderList(getItems, saveItems);
};
