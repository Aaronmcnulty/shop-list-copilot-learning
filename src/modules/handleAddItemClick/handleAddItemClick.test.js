import { handleAddItemClick } from "./handleAddItemClick";
import { renderList } from "../renderList/renderList.js";
import { getItems, saveItems } from "../localStorage/localStorage.js";

describe("handleAddItemClick", () => {
  beforeEach(() => {
    // Create mock item array to be used in tests.
    let itemsArray = [
      { name: "Apples", quantity: 2 },
      { name: "Oranges", quantity: 2 },
    ];

    // Render element for the shopping list.
    document.body.innerHTML = '<div id="shopping-list"></div>';

    // Store the mock items array in localStorage.
    saveItems("shoppingListItems", itemsArray);
  });

  test("Should call renderList and pass getItems and saveItems as arguements.", () => {
    // Mock input values
    const nameValue = "Banana";
    const quantityValue = 3;

    // Spy on the renderList function
    const renderList = jest.spyOn(
      require("../renderList/renderList.js"),
      "renderList",
    );

    // Call the function with mocked values.
    handleAddItemClick(nameValue, quantityValue);

    // Check if renderList was called with the correct arguments.
    expect(renderList).toHaveBeenCalledWith(getItems, saveItems);
  });

  test("Should call saveItems and pass the updated array as an argument.", () => {
    // Mock input values
    const nameValue = "Banana";
    const quantityValue = 3;

    const saveItems = jest.spyOn(
      require("../localStorage/localStorage.js"),
      "saveItems",
    );

    // Call the function
    handleAddItemClick(nameValue, quantityValue);
    expect(saveItems).toHaveBeenCalledWith("shoppingListItems", [
      { name: "Apples", quantity: 2 },
      { name: "Oranges", quantity: 2 },
      { name: "Banana", quantity: 3 },
    ]);
  });

  test("Should call getItems and pass 'shoppingListItems' as the key.", () => {
    // Mock input values
    const nameValue = "Banana";
    const quantityValue = 3;

    // Spy on the getItems function
    const getItems = jest.spyOn(
      require("../localStorage/localStorage.js"),
      "getItems",
    );

    // Call the function with mocked values.
    handleAddItemClick(nameValue, quantityValue);
    // Check if getItems was called with the correct key.
    expect(getItems).toHaveBeenCalledWith("shoppingListItems");
  });

  test("Should not be throw error when quantityValue type is string.", () => {
    // Emepty string mock input values
    const nameValue = "Grapes";
    const quantityValue = "";

    // Check that getItems, saveItems and renderList were not called.
    expect(() => {handleAddItemClick(nameValue, quantityValue)}).toThrow("Invalid input: nameValue must be a string and quantityValue must be a number.");
  });

  test("Should throw error when quantityValue is 0.", () => {
    // Mock input values.
    const nameValue = "Grapes";
    const quantityValue = 0;

    // Check that getItems, saveItems and renderList were not called.
    expect(() => {handleAddItemClick(nameValue, quantityValue)}).toThrow("Invalid input: Name cannot be empty and quantity must be at least 1.");
  
  });

  test("Should throw error when quantityValue is negative.", () => {
    // Mock input values.
    const nameValue = "Grapes";
    const quantityValue = -2;

    // Check that getItems, saveItems and renderList were not called.
    expect(() => {handleAddItemClick(nameValue, quantityValue)}).toThrow("Invalid input: Name cannot be empty and quantity must be at least 1.");

  });

  test("Should not be called when both arguments are undefined.", () => {
    // Mock input values undefined.
    const nameValue = undefined;
    const quantityValue = undefined;

    

   // Check that getItems, saveItems and renderList were not called.
    expect(() => {handleAddItemClick(nameValue, quantityValue)}).toThrow("Invalid input: nameValue must be a string and quantityValue must be a number.");
  
  });

  test("Should not be called when both arguments are null.", () => {
    const nameValue = null;
    const quantityValue = null;


    expect(() => {handleAddItemClick(nameValue, quantityValue)}).toThrow("Invalid input: nameValue must be a string and quantityValue must be a number.");
  });

  test("Should not be called when both arguments are NaN.", () => {
    const nameValue = NaN;
    const quantityValue = NaN;

    expect(() => {handleAddItemClick(nameValue, quantityValue)}).toThrow("Invalid input: nameValue must be a string and quantityValue must be a number.");

  });
});
