// Helper functions for the shopping list app
export function formatItem(item) {
  if (typeof item === 'string') {
    return item.trim();
  }
  return '';
}

export function capitalizeFirstLetter(string) {
  if (typeof string == 'string') {
    return string.trim().charAt(0).toUpperCase() + string.trim().slice(1).toLowerCase();
  } 
  return ''
}
