import { getItems, saveItems } from "./localStorage.js";

describe("saveItems", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("saveItems stores items in localStorage", () => {
    const items = [{ name: "apple", quantity: 2 }];
    saveItems("shoppingListItems", items);
    expect(localStorage.getItem("shoppingListItems")).toBe(
      JSON.stringify(items),
    );
  });

  test("saveItems updates existing items in localStorage", () => {
    const initialItems = [{ name: "orange", quantity: 1 }];
    saveItems("shoppingListItems", initialItems);
    const updatedItems = [{ name: "orange", quantity: 2 }];
    saveItems("shoppingListItems", updatedItems);
    expect(localStorage.getItem("shoppingListItems")).toBe(
      JSON.stringify(updatedItems),
    );
  });

  test("saveItems validates input is an array", () => {
  expect(() => saveItems("test", "not an array")).toThrow("Value must be an array.");
  expect(() => saveItems("test", { name: "item" })).toThrow("Value must be an array.");
  })
});


describe("getItems", () => {

  beforeEach(() => {
    localStorage.clear();
  });

  test("getItems retrieves items from localStorage", () => {
    const items = [{ name: "banana", quantity: 3 }];
    localStorage.setItem("shoppingListItems", JSON.stringify(items));
    expect(getItems("shoppingListItems")).toEqual(items);
  });

  test("getItems returns empty array if no key is provided", () => {
    expect(getItems()).toEqual([]);
  });

  test("getItems returns empty array if nothing stored", () => {
  expect(getItems("nonexistent-key")).toEqual([]);
  });

  test("getItems handles corrupted JSON gracefully", () => {
    localStorage.setItem("shoppingListItems", "invalid json");
    expect(getItems("shoppingListItems")).toEqual([]);
  });

  test("getItems returns empty array if key is not provided", () => {
    expect(getItems()).toEqual([]);
  });

  test("getItems handles corrupted JSON data", () => {
  // Uses setItem to bypass 'saveItems' validation when setting invalid JSON.
  localStorage.setItem("shoppingListItems", "{invalid json}");
  expect(getItems("shoppingListItems")).toEqual([]);
});

test("getItems works with different keys", () => {
  const items = [{ name: "test", quantity: 1 }];
  localStorage.setItem("different-key", JSON.stringify(items));
  expect(getItems("different-key")).toEqual(items);
});
})