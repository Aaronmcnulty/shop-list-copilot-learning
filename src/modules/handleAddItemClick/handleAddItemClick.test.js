import { handleAddItemClick } from "./handleAddItemClick.js";
import { getItems, saveItems } from "../localStorage/localStorage.js";

describe("handleAddItemClick", () => {
  
  let saveItemsSpy, getItemsSpy, renderListSpy;

  beforeEach(() => {

    // Setup DOM and localStorage
    document.body.innerHTML = '<div id="shopping-list"></div>';
    const itemsArray = [
      { name: "Apples", quantity: 2 },
      { name: "Oranges", quantity: 2 },
    ];

    saveItems("shoppingListItems", itemsArray);

    // Setup spies
    saveItemsSpy = jest.spyOn(require("../localStorage/localStorage.js"), "saveItems");
    getItemsSpy = jest.spyOn(require("../localStorage/localStorage.js"), "getItems");
    renderListSpy = jest.spyOn(require("../renderList/renderList.js"), "renderList");
  });

  afterEach(() => {
    jest.restoreAllMocks();
    localStorage.clear();
  });

  test("Should call renderList and pass getItems and saveItems as arguements.", () => {
    // Mock input values
    const nameValue = "Banana";
    const quantityValue = 3;

    // Call the function with mocked values.
    handleAddItemClick(nameValue, quantityValue);

    // Check if renderList was called with the correct arguments.
    expect(renderListSpy).toHaveBeenCalledWith(getItems, saveItems);
  });

  test("Should call saveItems and pass the updated array as an argument.", () => {
    // Mock input values
    const nameValue = "Banana";
    const quantityValue = 3;

    // Call the function
    handleAddItemClick(nameValue, quantityValue);
    expect(saveItemsSpy).toHaveBeenCalledWith("shoppingListItems", [
      { name: "Apples", quantity: 2 },
      { name: "Oranges", quantity: 2 },
      { name: "Banana", quantity: 3 },
    ]);
  });

  test("Should call getItems and pass 'shoppingListItems' as the key.", () => {
    // Mock input values
    const nameValue = "Banana";
    const quantityValue = 3;


    // Call the function with mocked values.
    handleAddItemClick(nameValue, quantityValue);
    // Check if getItems was called with the correct key.
    expect(getItemsSpy).toHaveBeenCalledWith("shoppingListItems");
  });

  test("Should throw error when quantityValue type is string.", () => {
    // Emepty string mock input values
    const nameValue = "Grapes";
    const quantityValue = "";

    // Check that getItems, saveItems and renderList were not called.
    expect(saveItemsSpy).not.toHaveBeenCalled();
    expect(getItemsSpy).not.toHaveBeenCalled();
    expect(renderListSpy).not.toHaveBeenCalled();
    // Expect an error to be thrown.
    expect(() => {handleAddItemClick(nameValue, quantityValue)}).toThrow("Invalid input: nameValue must be a string and quantityValue must be a number.");
  });

  test("Should throw error when quantityValue is 0.", () => {
    // Mock input values.
    const nameValue = "Grapes";
    const quantityValue = 0;


    // Check that getItems, saveItems and renderList were not called.
    expect(saveItemsSpy).not.toHaveBeenCalled();
    expect(getItemsSpy).not.toHaveBeenCalled();
    expect(renderListSpy).not.toHaveBeenCalled();
    // Expect an error to be thrown.
    expect(() => {handleAddItemClick(nameValue, quantityValue)}).toThrow("Invalid input: Name cannot be empty and quantity must be at least 1.");
  
  });

  test("Should throw error when quantityValue is negative.", () => {
    // Mock input values.
    const nameValue = "Grapes";
    const quantityValue = -2;

    // Check that getItems, saveItems and renderList were not called.
    expect(saveItemsSpy).not.toHaveBeenCalled();
    expect(getItemsSpy).not.toHaveBeenCalled();
    expect(renderListSpy).not.toHaveBeenCalled();
    // Expect an error to be thrown.
    expect(() => {handleAddItemClick(nameValue, quantityValue)}).toThrow("Invalid input: Name cannot be empty and quantity must be at least 1.");

  });

  test("Should not be called when both arguments are undefined.", () => {
    // Mock input values undefined.
    const nameValue = undefined;
    const quantityValue = undefined;

   // Check that getItems, saveItems and renderList were not called.
   expect(saveItemsSpy).not.toHaveBeenCalled();
    expect(getItemsSpy).not.toHaveBeenCalled();
    expect(renderListSpy).not.toHaveBeenCalled();
    // Expect an error to be thrown.
    expect(() => {handleAddItemClick(nameValue, quantityValue)}).toThrow("Invalid input: nameValue must be a string and quantityValue must be a number.");
  
  });

  test("Should not be called when both arguments are null.", () => {
    const nameValue = null;
    const quantityValue = null;

    // Check that getItems, saveItems and renderList were not called.
    expect(saveItemsSpy).not.toHaveBeenCalled();
    expect(getItemsSpy).not.toHaveBeenCalled();
    expect(renderListSpy).not.toHaveBeenCalled();
    // Expect an error to be thrown.
    expect(() => {handleAddItemClick(nameValue, quantityValue)}).toThrow("Invalid input: nameValue must be a string and quantityValue must be a number.");
  });

  test("Should not be called when both arguments are NaN.", () => {
    const nameValue = NaN;
    const quantityValue = NaN;

    // Check that getItems, saveItems and renderList were not called.
    expect(saveItemsSpy).not.toHaveBeenCalled();
    expect(getItemsSpy).not.toHaveBeenCalled();
    expect(renderListSpy).not.toHaveBeenCalled();
    // Expect an error to be thrown.
    expect(() => {handleAddItemClick(nameValue, quantityValue)}).toThrow("Invalid input: nameValue must be a string and quantityValue must be a number.");

  });
});
