import { handleAddItemClick } from "./handleAddItemClick";
import { renderList } from "../renderList/renderList.js";
import { getItems, saveItems } from "../localStorage/localStorage.js";

describe("handleAddItemClick", () => { 


  beforeEach(() => {
    // Clear localStorage before each test to ensure a clean state.
    window.localStorage.clear();

    // Create mock item array to be used in tests.
    let itemsArray = [
      { name: "Apples", quantity: 2 },
      { name: "Oranges", quantity: 2 },
    ];

    // Store the mock items in localStorage.
    saveItems("shoppingListItems", itemsArray);
  });

    test("should", () => {

        const nameValue = "Banana";
        const quantityValue = "2";

        const renderList = jest.spyOn(require("../renderList/renderList.js"), "renderList");
        document.body.innerHTML = '<div id="shopping-list"></div>';

        // Call the function
        handleAddItemClick(nameValue, quantityValue);
       expect(renderList).toHaveBeenCalledWith(getItems, saveItems);
    })

    test("should", () => {

        const nameValue = "Banana";
        const quantityValue = 3;

        const saveItems = jest.spyOn(require("../localStorage/localStorage.js"), "saveItems");
        document.body.innerHTML = '<div id="shopping-list"></div>';

        // Call the function
        handleAddItemClick(nameValue, quantityValue);
        expect(saveItems).toHaveBeenCalledWith('shoppingListItems', [{"name": "Apples", "quantity": 2},  {"name": "Oranges", "quantity": 2}, {"name": "Banana", "quantity": 3}]);
    })

    test("should", () => {

        const nameValue = "Banana";
        const quantityValue = "2";

        const getItems = jest.spyOn(require("../localStorage/localStorage.js"), "getItems");
        document.body.innerHTML = '<div id="shopping-list"></div>';

        // Call the function
        handleAddItemClick(nameValue, quantityValue);
        expect(getItems).toHaveBeenCalledWith('shoppingListItems');
    })
})


