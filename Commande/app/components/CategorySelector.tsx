import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { getCategoryEmoji, getCategoryName } from '../utils/helpers';

interface CategorySelectorProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categorySelector}
      contentContainerStyle={styles.categoryContent}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryChip,
            activeCategory === category && styles.activeCategoryChip
          ]}
          onPress={() => onCategoryChange(category)}
        >
          <Text style={styles.categoryEmoji}>
            {getCategoryEmoji(category)}
          </Text>
          <Text style={[
            styles.categoryChipText,
            activeCategory === category && styles.activeCategoryChipText
          ]}>
            {getCategoryName(category)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categorySelector: {
    marginBottom: 20,
  },
  categoryContent: {
    paddingHorizontal: 20,
  },
  categoryChip: {
    backgroundColor: "#f5e6d3",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 30,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    shadowColor: "#2c1810",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#c4a57b",
  },
  activeCategoryChip: {
    backgroundColor: "#8b5a3c",
    borderColor: "#6b4423",
  },
  categoryEmoji: {
    fontSize: 18,
  },
  categoryChipText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2c1810",
  },
  activeCategoryChipText: {
    color: "#f5e6d3",
  },
});

export default CategorySelector;