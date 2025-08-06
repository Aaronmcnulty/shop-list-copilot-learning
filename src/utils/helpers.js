// Helper functions for the shopping list app

//Trim whitespace from the start and end of a string.
export function formatItem(item) {
  if (typeof item === "string") {
    return item.trim();
  }
  return "";
}

// Capitalize the first letter of a string and lowercase the rest.
// If the input is not a string, return an empty string.
export function capitalizeFirstLetter(string) {
  if (typeof string == "string") {
    return (
      string.trim().charAt(0).toUpperCase() +
      string.trim().slice(1).toLowerCase()
    );
  }
  return "";
}
