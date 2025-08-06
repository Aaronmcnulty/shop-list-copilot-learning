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
        const renderList = jest.spyOn(require("../renderList/renderList.js"), "renderList");

        // Call the function with mocked values.
        handleAddItemClick(nameValue, quantityValue);

        // Check if renderList was called with the correct arguments.
        expect(renderList).toHaveBeenCalledWith(getItems, saveItems);
    })

    test("Should call saveItems and pass the updated array as an argument.", () => {

         // Mock input values
        const nameValue = "Banana";
        const quantityValue = 3;

        const saveItems = jest.spyOn(require("../localStorage/localStorage.js"), "saveItems");

        // Call the function
        handleAddItemClick(nameValue, quantityValue);
        expect(saveItems).toHaveBeenCalledWith('shoppingListItems', [{"name": "Apples", "quantity": 2},  {"name": "Oranges", "quantity": 2}, {"name": "Banana", "quantity": 3}]);
    })

    test("Should call getItems and pass 'shoppingListItems' as the key.", () => {

        // Mock input values
        const nameValue = "Banana";
        const quantityValue = 3

        // Spy on the getItems function
        const getItems = jest.spyOn(require("../localStorage/localStorage.js"), "getItems");

        // Call the function with mocked values.
        handleAddItemClick(nameValue, quantityValue);
        // Check if getItems was called with the correct key.
        expect(getItems).toHaveBeenCalledWith('shoppingListItems');
    })

    test("Should not be called when both arguments are empty strings.", () => {

        // Emepty string mock input values 
        const nameValue = "";
        const quantityValue = "";

        // Spy on the getItems, saveItems and renderList functions.
        const getItems = jest.spyOn(require("../localStorage/localStorage.js"), "getItems");
        const saveItems = jest.spyOn(require("../localStorage/localStorage.js"), "saveItems");
        const renderList = jest.spyOn(require("../renderList/renderList.js"), "renderList");


        // Call the function with empty string values.
        handleAddItemClick(nameValue, quantityValue);

        // Check that getItems, saveItems and renderList were not called.
        expect(getItems).not.toHaveBeenCalledWith('shoppingListItems');
        expect(saveItems).not.toHaveBeenCalledWith('shoppingListItems', [{"name": "Apples", "quantity": 2},  {"name": "Oranges", "quantity": 2}, {"name": "", "quantity": ""}]);
        expect(renderList).not.toHaveBeenCalledWith(getItems, saveItems);
      })

      test("Should not be called when one of the arguments is an empty string.", () => {
        
        // Mock input values. 
        const nameValue = "Grapes";
        const quantityValue = "";

        // Spy on the getItems, saveItems and renderList functions.
        const getItems = jest.spyOn(require("../localStorage/localStorage.js"), "getItems");
        const saveItems = jest.spyOn(require("../localStorage/localStorage.js"), "saveItems");
        const renderList = jest.spyOn(require("../renderList/renderList.js"), "renderList");

        // Call the function
        handleAddItemClick(nameValue, quantityValue);
        
        // Check that getItems, saveItems and renderList were not called.
        expect(getItems).not.toHaveBeenCalledWith('shoppingListItems');
        expect(saveItems).not.toHaveBeenCalledWith('shoppingListItems', [{"name": "Apples", "quantity": 2},  {"name": "Oranges", "quantity": 2}, {"name": "", "quantity": ""}]);
        expect(renderList).not.toHaveBeenCalledWith(getItems, saveItems);
      
      })

      test("Should not be called when both arguments are undefined.", () => {

        // Mock input values undefined.
        const nameValue = undefined;
        const quantityValue = undefined;

        // Spy on the getItems, saveItems and renderList functions.
        const getItems = jest.spyOn(require("../localStorage/localStorage.js"), "getItems");
        const saveItems = jest.spyOn(require("../localStorage/localStorage.js"), "saveItems");
        const renderList = jest.spyOn(require("../renderList/renderList.js"), "renderList");

        // Call the function
        handleAddItemClick(nameValue, quantityValue);
        
        // Check that getItems, saveItems and renderList were not called.
        expect(getItems).not.toHaveBeenCalledWith('shoppingListItems');
        expect(saveItems).not.toHaveBeenCalledWith('shoppingListItems', [{"name": "Apples", "quantity": 2},  {"name": "Oranges", "quantity": 2}, {"name": "", "quantity": ""}]);
        expect(renderList).not.toHaveBeenCalledWith(getItems, saveItems);
       })
      
      test("Should not be called when both arguments are null.", () => {

        const nameValue = null;
        const quantityValue = null;

        // Spy on the getItems, saveItems and renderList functions.
        const getItems = jest.spyOn(require("../localStorage/localStorage.js"), "getItems");
        const saveItems = jest.spyOn(require("../localStorage/localStorage.js"), "saveItems");
        const renderList = jest.spyOn(require("../renderList/renderList.js"), "renderList");

       
        // Call the function with null values.
        handleAddItemClick(nameValue, quantityValue);

        // Check that getItems, saveItems and renderList were not called.
        expect(getItems).not.toHaveBeenCalledWith('shoppingListItems');
        expect(saveItems).not.toHaveBeenCalledWith('shoppingListItems', [{"name": "Apples", "quantity": 2},  {"name": "Oranges", "quantity": 2}, {"name": "", "quantity": ""}]);
        expect(renderList).not.toHaveBeenCalledWith(getItems, saveItems);
      
      })

      test("Should not be called when both arguments are NaN.", () => {

        const nameValue = NaN;
        const quantityValue = NaN;


       // Spy on the getItems, saveItems and renderList functions.
        const getItems = jest.spyOn(require("../localStorage/localStorage.js"), "getItems");
        const saveItems = jest.spyOn(require("../localStorage/localStorage.js"), "saveItems");
        const renderList = jest.spyOn(require("../renderList/renderList.js"), "renderList");

        // Call the function with NaN values.
        handleAddItemClick(nameValue, quantityValue);

        // Check that getItems, saveItems and renderList were not called.
        expect(getItems).not.toHaveBeenCalledWith('shoppingListItems');
        expect(saveItems).not.toHaveBeenCalledWith('shoppingListItems', [{"name": "Apples", "quantity": 2},  {"name": "Oranges", "quantity": 2}, {"name": "", "quantity": ""}]);
        expect(renderList).not.toHaveBeenCalledWith(getItems, saveItems);
      })

      
})


