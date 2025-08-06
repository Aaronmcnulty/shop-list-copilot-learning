import { capitalizeFirstLetter } from "../../utils/helpers.js";

// Render the shopping list items in the DOM
// This function retrieves items from localStorage, creates HTML elements for each item,
// and appends them to the shopping list container.
// It also handles item removal and quantity updates.
// The getItems and saveItems functions are passed as parameters to allow for flexibility in data management
// and to avoid direct dependencies on localStorage within this module.
// This allows for easier testing and potential future changes to the data storage mechanism.



export function renderList(getItems, saveItems) {
  // Retrieve items from localStorage
  const items = getItems('shoppingListItems');
  // Get the shopping list container and clear its content
  const listDiv = document.getElementById("shopping-list");
  listDiv.innerHTML = "";

  // If no items are found, display a message and return early
  if (items.length === 0) {
    listDiv.innerHTML = "<p class='no-items-text'>No items yet.</p>";
    return;
  }
  // Create a 'ul' list element to hold the shopping list items
  // Each item will be represented as a list item with its name and quantity and a button to remove
  // the item from the list
  const ul = document.createElement("ul");
  ul.className = "shopping-list-ul";
  // Iterate over each item, creating a list item element for each
  items.forEach((item, idx) => {
    const li = document.createElement("li");
    li.className = "shopping-list-item";
    
    // Create item details container
    const itemDetails = document.createElement("div");
    itemDetails.className = "item-details";
    
    // create item name element and format it with capitalizeFirstLetter
    const itemName = document.createElement("span");
    itemName.className = "item-name";
    itemName.textContent = capitalizeFirstLetter(typeof item === 'object' ? item.name : item);
    
    
    // create quantity input element and set its properties. 
    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.className = "item-quantity";
    quantityInput.id = "list-item-quantity";
    // Set the value to the item's quantity or default to 1 if not an object
    quantityInput.value = typeof item === 'object' ? item.quantity : 1;
    quantityInput.min = 1;
    // Add an event listener to update the quantity in localStorage when changed by the user
    quantityInput.addEventListener('change', (e) => {
      const items = getItems('shoppingListItems');
      items[idx] = { 
        name: typeof items[idx] === 'object' ? items[idx].name : items[idx],
        quantity: parseInt(e.target.value) || 1
      };
      saveItems('shoppingListItems', items);
    });
  
    // Append item name and quantity input to the item details container
    itemDetails.appendChild(itemName);
    itemDetails.appendChild(quantityInput);
    li.appendChild(itemDetails);
    

    // create a remove button for each item
    // When clicked, it will remove the item from the list and update localStorage
    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-item-button";
    removeBtn.textContent = "Remove";
    // Add an event listener to the remove button to handle item removal
    // It retrieves the current items in localStorage, removes the clicked item, and saves the 
    // updated list and re-renders the list.
    removeBtn.onclick = () => {
      const updated = getItems('shoppingListItems');
      updated.splice(idx, 1);
      saveItems('shoppingListItems', updated);
      renderList(getItems, saveItems);
    };
    // Append the remove button to the list item and then to the unordered list
    li.appendChild(removeBtn);
    ul.appendChild(li);
  });
  listDiv.appendChild(ul);
}
