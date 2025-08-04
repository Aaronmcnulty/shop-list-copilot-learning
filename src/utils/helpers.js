// Helper functions for the shopping list app
export function formatItem(item) {
  return item.trim();
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
