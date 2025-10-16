import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Order } from '../types';

interface OrderItemProps {
  item: Order;
  onEdit: (order: Order) => void;
  onRemove: (orderId: number) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ item, onEdit, onRemove }) => {
  return (
    <View style={styles.orderItem}>
      <View style={styles.orderHeader}>
        <Image source={{ uri: item.image }} style={styles.orderImage} />
        <View style={styles.orderInfo}>
          <Text style={styles.orderText}>
            {item.quantity}x {item.dish}
          </Text>
          <Text style={styles.orderCategory}>☕ {item.category}</Text>
          <Text style={styles.orderPrice}>{item.total} DT</Text>
          {item.createdAt && (
            <Text style={styles.orderDate}>
              {new Date(item.createdAt).toLocaleDateString('fr-FR')}
            </Text>
          )}
        </View>
        <View style={styles.orderActions}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => onEdit(item)}
          >
            <Text style={styles.buttonText}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => onRemove(item.id)}
          >
            <Text style={styles.buttonText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>

      {item.comments.length > 0 && (
        <View style={styles.commentsContainer}>
          {item.comments.map((c, i) => (
            <View key={i} style={styles.commentRow}>
              <Text style={styles.commentBullet}>☕</Text>
              <Text style={styles.commentText}>{c}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#2c1810",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f5e6d3",
  },
  orderHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 14,
    borderWidth: 2,
    borderColor: "#c4a57b",
  },
  orderInfo: {
    flex: 1,
  },
  orderText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2c1810",
    marginBottom: 4,
  },
  orderCategory: {
    fontSize: 13,
    color: "#8b5a3c",
    fontStyle: "italic",
    marginBottom: 6,
  },
  orderPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8b5a3c",
  },
  orderDate: {
    fontSize: 11,
    color: "#c4a57b",
    fontStyle: "italic",
    marginTop: 3,
  },
  orderActions: {
    flexDirection: "column",
    gap: 8,
  },
  editButton: {
    backgroundColor: "#f59e0b",
    padding: 10,
    borderRadius: 10,
    minWidth: 44,
    alignItems: "center",
    shadowColor: "#2c1810",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  removeButton: {
    backgroundColor: "#ef4444",
    padding: 10,
    borderRadius: 10,
    minWidth: 44,
    alignItems: "center",
    shadowColor: "#2c1810",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
  },
  commentsContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f5e6d3",
    gap: 6,
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  commentBullet: {
    fontSize: 14,
    marginTop: 1,
  },
  commentText: {
    fontSize: 13,
    color: "#6b4423",
    flex: 1,
    lineHeight: 18,
  },
});

export default OrderItem;