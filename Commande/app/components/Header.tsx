import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface HeaderProps {
  ordersCount: number;
  onCartPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ ordersCount, onCartPress }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.icon}>☕</Text>
          <View>
            <Text style={styles.title}>Café Arabica</Text>
            <Text style={styles.subtitle}>L'art du café tunisien</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.cartButton} onPress={onCartPress}>
          <View style={styles.cartBadge}>
            <Text style={styles.cartCount}>{ordersCount}</Text>
          </View>
          <Text style={styles.cartIcon}>🛒</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.decorativeLine}>
        <View style={styles.lineLeft} />
        <Text style={styles.decorativeIcon}>☕</Text>
        <View style={styles.lineRight} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2c1810",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#f5e6d3",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
    color: "#c4a57b",
    fontStyle: "italic",
    marginTop: 2,
  },
  cartButton: {
    backgroundColor: "#8b5a3c",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    position: "relative",
  },
  cartIcon: {
    fontSize: 20,
  },
  cartBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#dc2626",
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#2c1810",
  },
  cartCount: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  decorativeLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  lineLeft: {
    flex: 1,
    height: 1,
    backgroundColor: "#8b5a3c",
    opacity: 0.5,
  },
  lineRight: {
    flex: 1,
    height: 1,
    backgroundColor: "#8b5a3c",
    opacity: 0.5,
  },
  decorativeIcon: {
    fontSize: 16,
    opacity: 0.6,
  },
});

export default Header;