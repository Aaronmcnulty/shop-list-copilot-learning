import { renderList } from "./renderList.js";
import { getItems, saveItems } from "../localStorage/localStorage.js";

describe("renderList", () => {
  
  // Set up test environment before each test.
  beforeEach(() => {
    
    // Create mock item array to be used in tests.
    let itemsArray = [
      { name: "Apples", quantity: 2 },
      { name: "Oranges", quantity: 2 },
    ];

    // reset document body to ensure a clean slate for each test.
     document.body.innerHTML = '<div id="shopping-list"></div>';


    // Store the mock items in localStorage.
    saveItems("shoppingListItems", itemsArray);
  });

  afterEach(() => {
    // Clear localStorage before each test to ensure a clean state.
    window.localStorage.clear();
  
    document.body.innerHTML = '';
  });

  // **Test cases for renderList function.**

  it("should create a list with items from localStorage", () => {
    // Create a container for the rendered list

    // Call renderList with mocked localStorage functions
    renderList(getItems, saveItems);

    // Check if the list is rendered correctly
    const ul = document.querySelector(".shopping-list-ul");
    expect(ul).not.toBeNull();
    expect(ul.children.length).toBe(2);

    // Check if the items are rendered in correct order with correct names and quantities
    const firstItem = ul.children[0];
    expect(firstItem.querySelector(".item-name").textContent).toBe("Apples");
    expect(firstItem.querySelector(".item-quantity").value).toBe("2");

    const secondItem = ul.children[1];
    expect(secondItem.querySelector(".item-name").textContent).toBe("Oranges");
    expect(secondItem.querySelector(".item-quantity").value).toBe("2");
  });

  it("should display 'No items yet.' when there are no items", () => {
    // Clear localStorage to simulate no items.
    saveItems("shoppingListItems", []);

    // Call renderList with mocked localStorage functions
    renderList(getItems, saveItems);

    // Check if the no items message is displayed in the list container
    const noItemsText = document.querySelector(".no-items-text");
    expect(noItemsText).not.toBeNull();
    expect(noItemsText.textContent).toBe("No items yet.");
  });

  it("should update item quantity in localStorage when changed", () => {
   
    // Mock saveItems to so we can check if it was called with the correct parameters.
    const mockSaveItems = jest.fn();

    // Call renderList with mocked functions
    renderList(getItems, mockSaveItems);

    // Check if initial items are rendered correctly
    expect(getItems("shoppingListItems")).toEqual([
      { name: "Apples", quantity: 2 },
      { name: "Oranges", quantity: 2 },
    ]);

    // Find the quantity input element and change its value to 5
    const quantityInput = document.querySelector(".item-quantity");
    quantityInput.value = 5;
    // Trigger the change event to simulate user input
    quantityInput.dispatchEvent(new Event("change"));

    // Check if mockSaveItems was called.
    expect(mockSaveItems).toHaveBeenCalled();
    // Check if mockSaveItems was called with the updated quantity
    expect(mockSaveItems).toHaveBeenCalledWith("shoppingListItems", [
      { name: "Apples", quantity: 5 },
      { name: "Oranges", quantity: 2 },
    ]);
  });

  it("should remove an item when the remove button is clicked", () => {
    
    // Call renderList with mocked localStorage functions
    renderList(getItems, saveItems);

    // Check if the initial items are rendered correctly
    expect(getItems("shoppingListItems")).toEqual([
      { name: "Apples", quantity: 2 },
      { name: "Oranges", quantity: 2 },
    ]);

    // Find the remove button for the first item and simulate user click.
    const removeButtons = document.querySelectorAll(".remove-item-button");
    removeButtons[0].click();

    // Check if saveItems was called with the updated list
    expect(getItems("shoppingListItems")).toEqual([
      { name: "Oranges", quantity: 2 },
    ]);
  });

  it("Should create a remove button for each item", () => {
    
    // Call renderList with mocked localStorage functions
    renderList(getItems, saveItems);

    // Check if the remove button is created for each item.
    const removeButtons = document.querySelectorAll(".remove-item-button");
    expect(removeButtons.length).toBe(2);
    expect(removeButtons[0].textContent).toBe("Remove");
  });

  it("Should rerender the list after an item is removed", () => {
    
    // Call renderList with mocked localStorage functions
    renderList(getItems, saveItems);

    // Find the remove button for the first list item element and click it
    const removeButtons = document.querySelectorAll(".remove-item-button");
    removeButtons[0].click();

    // Check if the list is rerendered correctly
    const ul = document.querySelector(".shopping-list-ul");
    expect(ul.children.length).toBe(1);
    expect(ul.children[0].querySelector(".item-name").textContent).toBe(
      "Oranges",
    );
    expect(ul.children[0].querySelector(".item-quantity").value).toBe("2");
  });

  it("Should not render the list if no items are present", () => {
    
    // Clear localStorage to simulate no items.
    saveItems("shoppingListItems", []);

    // Call renderList with mocked localStorage functions
    renderList(getItems, saveItems);

    // Check if the list is not rendered and the no items message is displayed
    const ul = document.querySelector(".shopping-list-ul");
    expect(ul).toBeNull();
    const noItemsText = document.querySelector(".no-items-text");
    expect(noItemsText).not.toBeNull();
  });

  it("should create accessibility attributes for elements", () => {
    renderList(getItems, saveItems);

    const quantityInput = document.querySelector(".item-quantity");
    expect(quantityInput.getAttribute("aria-label")).toContain("Apples");
    
    const removeButton = document.querySelector(".remove-item-button");
    expect(removeButton.getAttribute("aria-label")).toContain("Apples");
  });

});
