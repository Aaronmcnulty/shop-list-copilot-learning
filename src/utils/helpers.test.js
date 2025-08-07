import { capitalizeFirstLetter, formatItem } from "./helpers.js";

// Tests for capitalizeFirstLetter function

describe("capitalizeFirstLetter", () => {
  test("capitalizes the first letter of a string", () => {
    expect(capitalizeFirstLetter("hello")).toBe("Hello");
  });

  test("returns an empty string when input is empty", () => {
    expect(capitalizeFirstLetter("")).toBe("");
  });

  test("handles strings with leading spaces", () => {
    expect(capitalizeFirstLetter("  world")).toBe("World");
  });

  test("trims the input before capitalizing", () => {
    expect(capitalizeFirstLetter("  test ")).toBe("Test");
  });

  test("handles single character strings", () => {
    expect(capitalizeFirstLetter("a")).toBe("A");
    expect(capitalizeFirstLetter(" ")).toBe("");
  });

  test("returns an empty string for non-string inputs", () => {
    expect(capitalizeFirstLetter(null)).toBe("");
    expect(capitalizeFirstLetter(undefined)).toBe("");
    expect(capitalizeFirstLetter(123)).toBe("");
  });

  test("returns string with only first letter capitalized", () => {
    expect(capitalizeFirstLetter("aBcDe")).toBe("Abcde");
  });

  test("handles strings with special characters", () => {
    expect(capitalizeFirstLetter("!hello")).toBe("!hello");
    expect(capitalizeFirstLetter("@world")).toBe("@world");
  });

  test("handles strings with numbers", () => {
    expect(capitalizeFirstLetter("123abc")).toBe("123abc");
    expect(capitalizeFirstLetter("1a2b3c")).toBe("1a2b3c");
  });

  test("does not modify already capitalized strings", () => {
    expect(capitalizeFirstLetter("Already")).toBe("Already");
  });

  test("handles mixed whitespace characters", () => {
  expect(capitalizeFirstLetter("\t\n hello \r")).toBe("Hello");
  });

  test("returns empty string for array inputs", () => {
  expect(formatItem([])).toBe("");
  expect(capitalizeFirstLetter({})).toBe("");
  });

  test("handles unicode characters", () => {
  expect(capitalizeFirstLetter("émile")).toBe("Émile");
});
});

// Format item tests 

describe("formatItem", () => {
  test("trims whitespace from the item", () => {
    expect(formatItem("  item  ")).toBe("item");
  });

  test("returns an empty string if input is empty", () => {
    expect(formatItem("")).toBe("");
  });

  test("handles strings with only spaces", () => {
    expect(formatItem("   ")).toBe("");
  });

  test("returns the same string if no leading or trailing spaces", () => {
    expect(formatItem("item")).toBe("item");
  });

  test("returns a trimmed string with special characters", () => {
    expect(formatItem("!@# $%^&*()")).toBe("!@# $%^&*()");
    expect(formatItem("12345 ")).toBe("12345");
  });

  test("returns an empty string for non-string inputs", () => {
    expect(formatItem(null)).toBe("");
    expect(formatItem(undefined)).toBe("");
    expect(formatItem(123)).toBe("");
  });

  test("returns an empty string for boolean inputs", () => {
    expect(formatItem(true)).toBe("");
    expect(formatItem(false)).toBe("");
  });
});
