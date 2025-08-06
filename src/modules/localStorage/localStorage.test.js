import { getItems, saveItems } from './localStorage.js';

describe('Local Storage Module', () => { 

    beforeEach(() => {
        localStorage.clear();
    });

    test('saveItems stores items in localStorage', () => {
        const items = [{ name: 'apple', quantity: 2 }];
        saveItems('shoppingListItems', items);
        expect(localStorage.getItem('shoppingListItems')).toBe(JSON.stringify(items));
    });

    test('getItems retrieves items from localStorage', () => {
        const items = [{ name: 'banana', quantity: 3 }];
        localStorage.setItem('shoppingListItems', JSON.stringify(items));
        expect(getItems('shoppingListItems')).toEqual(items);
    });

    test('getItems returns empty array if nothing stored', () => {
        expect(getItems()).toEqual([]);
    }); 

    test('saveItems updates existing items in localStorage', () => {
        const initialItems = [{ name: 'orange', quantity: 1 }];
        saveItems('shoppingListItems', initialItems);
        const updatedItems = [{ name: 'orange', quantity: 2 }];
        saveItems('shoppingListItems', updatedItems);
        expect(localStorage.getItem('shoppingListItems')).toBe(JSON.stringify(updatedItems));
    });

})