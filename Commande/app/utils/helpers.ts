export const getCategoryEmoji = (category: string): string => {
  const emojis: { [key: string]: string } = {
    "chaudes": "☕",
    "Boissons": "🍹",
    "Pâtisseries": "🧁",
    "Plats": "🍛"
  };
  return emojis[category] || "🍽️";
};

export const getCategoryName = (category: string): string => {
  const names: { [key: string]: string } = {
    "chaudes": "Boissons chaudes",
    "Boissons": "Boissons froides",
    "Pâtisseries": "Pâtisseries",
    "Plats": "Plats légers"
  };
  return names[category] || category;
};
