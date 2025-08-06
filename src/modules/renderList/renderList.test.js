import { renderList } from "./renderList";

describe("renderList", () => {

    // Mock localStorage. 
        const localStorageMock = (function () {
          let store = {};
          return {
            getItem(key) {
              return store[key];
            },
            setItem(key, value) {
              store[key] = value;
            },
            clear() {
              store = {};
            },
            removeItem(key) {
              delete store[key];
            },
            getAll() {
              return store;
            },
          };
        })();
        Object.defineProperty(window, "localStorage", {
          value: localStorageMock,
        });


        // Stores passed in key/value pairs in localStorage.
        const setLocalStorage = (key, value) => {
            window.localStorage.setItem(key, JSON.stringify(value));
        };

        // Retrieves items from localStorage by key.
        const getLocalStorage = (key) => {
            const items = localStorage.getItem(key);
            return items ? JSON.parse(items) : [];
        };

    
        // Set up test environment before each test.
        beforeEach(() => {
       // Clear localStorage before each test to ensure a clean state.
        window.localStorage.clear();
         
        // Create mock item array to be used in tests.
        let itemsArray = [
            { name: "Apples", quantity: 2 },
            { name: "Oranges", quantity: 2 },
        ];

        // Store the mock items in localStorage.
        setLocalStorage('shoppingListItems', itemsArray);
    })

    it("should create a list with items from localStorage", () => {
       
        // Create a container for the rendered list
        document.body.innerHTML = '<div id="shopping-list"></div>';

        // Call renderList with mocked localStorage functions
        renderList(getLocalStorage, setLocalStorage);

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
    })
    
    it("should display 'No items yet.' when there are no items", () => {
        
        // Clear localStorage to simulate no items.
        setLocalStorage('shoppingListItems', []);

        // Create a container for the rendered list
        document.body.innerHTML = '<div id="shopping-list"></div>';

        // Call renderList with mocked localStorage functions
        renderList(getLocalStorage, setLocalStorage);

        // Check if the no items message is displayed in the list container
        const noItemsText = document.querySelector(".no-items-text");
        expect(noItemsText).not.toBeNull();
        expect(noItemsText.textContent).toBe("No items yet.");
    })

    it("should update item quantity in localStorage when changed", () => {
        
        // Create a container for the rendered list.
        document.body.innerHTML = '<div id="shopping-list"></div>';

        // Mock saveItems to so we can check if it was called with the correct parameters.
        const mockSaveItems = jest.fn();

        // Call renderList with mocked functions
        renderList(getLocalStorage, mockSaveItems);

        // Check if initial items are rendered correctly
        expect(getLocalStorage('shoppingListItems')).toEqual(
            [{"name": "Apples", "quantity": 2}, {"name": "Oranges", "quantity": 2}]
        );

        // Find the quantity input element and change its value to 5
        const quantityInput = document.querySelector(".item-quantity");
        quantityInput.value = 5;
        // Trigger the change event to simulate user input
        quantityInput.dispatchEvent(new Event('change'));

        // Check if mockSaveItems was called.
        expect(mockSaveItems).toHaveBeenCalled();
        // Check if mockSaveItems was called with the updated quantity
        expect(mockSaveItems).toHaveBeenCalledWith(
           "shoppingListItems", [{"name": "Apples", "quantity": 5}, {"name": "Oranges", "quantity": 2}]
        );
    })

    it('should remove an item when the remove button is clicked', () => {
    

        // Create a container for the rendered list
        document.body.innerHTML = '<div id="shopping-list"></div>';

        // Call renderList with mocked localStorage functions
        renderList(getLocalStorage, setLocalStorage);

        // Check if the initial items are rendered correctly
        expect(getLocalStorage('shoppingListItems')).toEqual(
           [{"name": "Apples", "quantity": 2}, {"name": "Oranges", "quantity": 2}]
        );
      
        // Find the remove button for the first item and simulate user click.
        const removeButtons = document.querySelectorAll(".remove-item-button");
        removeButtons[0].click();

        // Check if saveItems was called with the updated list
        expect(getLocalStorage('shoppingListItems')).toEqual(
            [{"name": "Oranges", "quantity": 2}]
        );
    })

    it('Should create a remove button for each item', () => {
       
        // Create a container for the rendered list
        document.body.innerHTML = '<div id="shopping-list"></div>';

        // Call renderList with mocked localStorage functions
        renderList(getLocalStorage, setLocalStorage);

        // Check if the remove button is created for each item.
        const removeButtons = document.querySelectorAll(".remove-item-button");
        expect(removeButtons.length).toBe(2);
        expect(removeButtons[0].textContent).toBe("Remove");
    })
    
    it('Should rerender the list after an item is removed', () => { 

        // Create a container for the rendered list
        document.body.innerHTML = '<div id="shopping-list"></div>';
        
        // Call renderList with mocked localStorage functions
        renderList(getLocalStorage, setLocalStorage);
        
        // Find the remove button for the first list item element and click it
        const removeButtons = document.querySelectorAll(".remove-item-button");
        removeButtons[0].click();

        // Check if the list is rerendered correctly
        const ul = document.querySelector(".shopping-list-ul");
        expect(ul.children.length).toBe(1);
        expect(ul.children[0].querySelector(".item-name").textContent).toBe("Oranges");
        expect(ul.children[0].querySelector(".item-quantity").value).toBe("2");
    
    })

})