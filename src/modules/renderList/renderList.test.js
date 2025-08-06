import { renderList } from "./renderList";

describe("renderList", () => {


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


        // Stores passed in itemsArray in localStorage as mockItemsArray.
        const setLocalStorage = (key, value) => {
            window.localStorage.setItem(key, JSON.stringify(value));
        };

        const getLocalStorage = (key) => {
            const items = localStorage.getItem(key);
            return items ? JSON.parse(items) : [];
        };

    beforeEach(() => {
        window.localStorage.clear();
         
        let itemsArray = [
            { name: "Apples", quantity: 2 },
            { name: "Oranges", quantity: 2 },
        ];

        setLocalStorage('shoppingListItems', itemsArray);
    })

    it("should create a list with items from localStorage", () => {
       
        // Create a container for the rendered list
        document.body.innerHTML = '<div id="shopping-list"></div>';


        renderList(getLocalStorage, setLocalStorage);

        // Check if the list is rendered correctly
        const ul = document.querySelector(".shopping-list-ul");
        expect(ul).not.toBeNull();
        expect(ul.children.length).toBe(2);
        
        const firstItem = ul.children[0];
        expect(firstItem.querySelector(".item-name").textContent).toBe("Apples");
        expect(firstItem.querySelector(".item-quantity").value).toBe("2");

        const secondItem = ul.children[1];
        expect(secondItem.querySelector(".item-name").textContent).toBe("Oranges");
        expect(secondItem.querySelector(".item-quantity").value).toBe("2");
    })
    
    it("should display 'No items yet.' when there are no items", () => {
        
        setLocalStorage('shoppingListItems', []);

        document.body.innerHTML = '<div id="shopping-list"></div>';

        // Call renderList with mocked functions
        renderList(getLocalStorage, setLocalStorage);

        // Check if the no items message is displayed
        const noItemsText = document.querySelector(".no-items-text");
        expect(noItemsText).not.toBeNull();
        expect(noItemsText.textContent).toBe("No items yet.");
    })

    it("should update item quantity in localStorage when changed", () => {
        
        // Create a container for the rendered list
        document.body.innerHTML = '<div id="shopping-list"></div>';

        // Mock saveItems to track calls
        const mockSaveItems = jest.fn();

        // Call renderList with mocked functions
        renderList(getLocalStorage, mockSaveItems);

         expect(getLocalStorage('shoppingListItems')).toEqual(
            [{"name": "Apples", "quantity": 2}, {"name": "Oranges", "quantity": 2}]
        );
        // Find the quantity input and change its value
        const quantityInput = document.querySelector(".item-quantity");
        quantityInput.value = 5;
        quantityInput.dispatchEvent(new Event('change'));
        // Check if saveItems was called with the updated item
        expect(mockSaveItems).toHaveBeenCalledWith(
           "shoppingListItems", [{"name": "Apples", "quantity": 5}, {"name": "Oranges", "quantity": 2}]
        );
    })

    it('should remove an item when the remove button is clicked', () => {
    

        // Create a container for the rendered list
        document.body.innerHTML = '<div id="shopping-list"></div>';

        // Call renderList with mocked functions
        renderList(getLocalStorage, setLocalStorage);

        expect(getLocalStorage('shoppingListItems')).toEqual(
           [{"name": "Apples", "quantity": 2}, {"name": "Oranges", "quantity": 2}]
        );
      
        // Find the remove button for the first item and click it
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

        renderList(getLocalStorage, setLocalStorage);

        // Check if the remove button is created for each item.
        const removeButtons = document.querySelectorAll(".remove-item-button");
        expect(removeButtons.length).toBe(2);
        expect(removeButtons[0].textContent).toBe("Remove");
    })
    
    it('Should rerender the list after an item is removed', () => { 

        
        let itemsArray = [
            { name: "Apples", quantity: 2 },
            { name: "Oranges", quantity: 2 },
        ];

        
        //Call saveItems to store itemsArray.
        setLocalStorage('shoppingListItems', itemsArray);

        // Create a container for the rendered list
        document.body.innerHTML = '<div id="shopping-list"></div>';
        
        renderList(getLocalStorage, setLocalStorage);

        // Find the remove button for the first item and click it
        const removeButtons = document.querySelectorAll(".remove-item-button");
        removeButtons[0].click();

        // Check if the list is rerendered correctly
        const ul = document.querySelector(".shopping-list-ul");
        expect(ul.children.length).toBe(1);
        expect(ul.children[0].querySelector(".item-name").textContent).toBe("Oranges");
        expect(ul.children[0].querySelector(".item-quantity").value).toBe("2");
    
    })

})