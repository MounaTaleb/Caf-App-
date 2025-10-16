import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Dish } from '../types';
import { getCategoryEmoji } from '../utils/helpers';

interface DishCardProps {
  item: Dish;
  category: string;
  isSelected: boolean;
  onSelect: (item: Dish & { category: string }) => void;
}

const DishCard: React.FC<DishCardProps> = ({ item, category, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      style={[
        styles.dishCard,
        isSelected && styles.selectedDishCard
      ]}
      onPress={() => onSelect({ ...item, category })}
    >
      <View style={styles.dishImageContainer}>
        <Image source={{ uri: item.image }} style={styles.dishImage} />
        <View style={styles.overlay} />
        <View style={styles.priceBadge}>
          <Text style={styles.priceBadgeText}>{item.price} DT</Text>
        </View>
        {isSelected && (
          <View style={styles.selectedOverlay}>
            <Text style={styles.selectedCheckmark}>✓</Text>
          </View>
        )}
      </View>

      <View style={styles.dishInfo}>
        <View style={styles.dishHeader}>
          <Text style={styles.dishName}>{item.name}</Text>
          <Text style={styles.categoryIcon}>{getCategoryEmoji(category)}</Text>
        </View>
        <Text style={styles.dishDescription} numberOfLines={2}>
          {item.description}
        </Text>

        {isSelected && (
          <View style={styles.selectedIndicator}>
            <Text style={styles.selectedIndicatorText}>✓ Sélectionné</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dishCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: "#2c1810",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "transparent",
  },
  selectedDishCard: {
    borderColor: "#8b5a3c",
    transform: [{ scale: 1.02 }],
  },
  dishImageContainer: {
    position: "relative",
    height: 140,
  },
  dishImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(44, 24, 16, 0.1)",
  },
  priceBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#8b5a3c",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  priceBadgeText: {
    color: "#f5e6d3",
    fontSize: 13,
    fontWeight: "bold",
  },
  selectedOverlay: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#10b981",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCheckmark: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  dishInfo: {
    padding: 14,
  },
  dishHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  dishName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2c1810",
    flex: 1,
    marginRight: 4,
  },
  categoryIcon: {
    fontSize: 16,
  },
  dishDescription: {
    fontSize: 12,
    color: "#6b4423",
    marginBottom: 10,
    lineHeight: 16,
  },
  selectedIndicator: {
    backgroundColor: "#10b981",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  selectedIndicatorText: {
    fontSize: 11,
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default DishCard;