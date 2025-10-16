import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dish } from '../types';
import DishCard from './DishCard';

interface DishGridProps {
  dishes?: Dish[];
  category: string;
  selectedDish: (Dish & { category: string }) | null;
  onSelectDish: (dish: Dish & { category: string }) => void;
  onResetForm: () => void;
}

const DishGrid: React.FC<DishGridProps> = ({
  dishes = [],
  category,
  selectedDish,
  onSelectDish,
  onResetForm,
}) => {
  const handleSelectDish = (dish: Dish & { category: string }) => {
    if (selectedDish?.id === dish.id) {
      onResetForm();
    } else {
      onSelectDish(dish);
    }
  };

  return (
    <View style={styles.dishGrid}>
      {Array.isArray(dishes) && dishes.length > 0 ? (
        dishes.map((item) => (
          <DishCard
            key={item.id}
            item={item}
            category={category}
            isSelected={selectedDish?.id === item.id}
            onSelect={handleSelectDish}
          />
        ))
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>☕</Text>
          <Text style={styles.emptyText}>Aucun produit disponible</Text>
          <Text style={styles.emptySubtext}>dans cette catégorie</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dishGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  emptyState: {
    width: "100%",
    alignItems: "center",
    padding: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6b4423",
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#c4a57b",
  },
});

export default DishGrid;