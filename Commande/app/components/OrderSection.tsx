import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import { Dish, Order } from '../types';

interface OrderSectionProps {
  selectedDish: (Dish & { category: string }) | null;
  editingOrder: Order | null;
  quantity: number;
  setQuantity: (quantity: number) => void;
  commentInput: string;
  setCommentInput: (text: string) => void;
  comments: string[];
  setComments: (comments: string[]) => void;
  onAddOrder: () => void;
  onUpdateOrder: () => void;
  onCancelEdit: () => void;
}

const OrderSection: React.FC<OrderSectionProps> = ({
  selectedDish,
  editingOrder,
  quantity,
  setQuantity,
  commentInput,
  setCommentInput,
  comments,
  setComments,
  onAddOrder,
  onUpdateOrder,
  onCancelEdit,
}) => {
  const addComment = () => {
    if (commentInput.trim() === "") {
      Alert.alert("Attention", "Veuillez saisir une note");
      return;
    }
    setComments([...comments, commentInput]);
    setCommentInput("");
  };

  return (
    <View style={styles.orderSection}>
      <View style={styles.selectedDishHeader}>
        <Image
          source={{ uri: selectedDish?.image }}
          style={styles.selectedDishImage}
        />
        <View style={styles.selectedDishInfo}>
          <Text style={styles.selectedDishTitle}>
            {selectedDish?.name}
          </Text>
          <Text style={styles.selectedDishDescription} numberOfLines={2}>
            {selectedDish?.description}
          </Text>
          <Text style={styles.selectedDishPrice}>
            {selectedDish?.price} DT
          </Text>
          {editingOrder && (
            <View style={styles.editingBadge}>
              <Text style={styles.editingText}>✏️ Modification</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.quantitySection}>
        <Text style={styles.quantityLabel}>Quantité</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </TouchableOpacity>

          <View style={styles.quantityValueContainer}>
            <Text style={styles.quantityValue}>{quantity}</Text>
          </View>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>＋</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.commentsSection}>
        <Text style={styles.commentsLabel}>💬 Notes spéciales</Text>
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Ex: Sans sucre, chaud, extra mousse..."
            placeholderTextColor="#c4a57b"
            value={commentInput}
            onChangeText={setCommentInput}
            onSubmitEditing={addComment}
            returnKeyType="done"
            multiline
          />
          <TouchableOpacity style={styles.addCommentButton} onPress={addComment}>
            <Text style={styles.addCommentButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {comments.length > 0 && (
          <View style={styles.commentsList}>
            {comments.map((comment, index) => (
              <View key={index} style={styles.commentItem}>
                <Text style={styles.commentBullet}>☕</Text>
                <Text style={styles.commentItemText}>{comment}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.addOrderButton,
          editingOrder && styles.editOrderButton
        ]}
        onPress={editingOrder ? onUpdateOrder : onAddOrder}
      >
        <Text style={styles.addOrderButtonText}>
          {editingOrder ? '✏️ Modifier' : '✓ Ajouter'} - {selectedDish?.price ? selectedDish.price * quantity : 0} DT
        </Text>
      </TouchableOpacity>

      {editingOrder && (
        <TouchableOpacity
          style={styles.cancelEditButton}
          onPress={onCancelEdit}
        >
          <Text style={styles.cancelEditButtonText}>✕ Annuler la modification</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderSection: {
    backgroundColor: "#f5e6d3",
    margin: 20,
    padding: 20,
    borderRadius: 25,
    shadowColor: "#2c1810",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 2,
    borderColor: "#c4a57b",
  },
  selectedDishHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 18,
    borderBottomWidth: 2,
    borderBottomColor: "#c4a57b",
  },
  selectedDishImage: {
    width: 90,
    height: 90,
    borderRadius: 16,
    marginRight: 15,
    borderWidth: 3,
    borderColor: "#8b5a3c",
  },
  selectedDishInfo: {
    flex: 1,
  },
  selectedDishTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#2c1810",
    marginBottom: 6,
  },
  selectedDishDescription: {
    fontSize: 14,
    color: "#6b4423",
    marginBottom: 8,
    lineHeight: 18,
  },
  selectedDishPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8b5a3c",
  },
  editingBadge: {
    backgroundColor: "#f59e0b",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  editingText: {
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "bold",
  },
  quantitySection: {
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2c1810",
    marginBottom: 14,
    textAlign: "center",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  quantityButton: {
    backgroundColor: "#8b5a3c",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2c1810",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  quantityButtonText: {
    color: "#f5e6d3",
    fontSize: 24,
    fontWeight: "bold",
  },
  quantityValueContainer: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#8b5a3c",
  },
  quantityValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c1810",
    minWidth: 40,
    textAlign: "center",
  },
  commentsSection: {
    marginBottom: 20,
  },
  commentsLabel: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2c1810",
    marginBottom: 12,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#c4a57b",
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    fontSize: 14,
    minHeight: 55,
    textAlignVertical: "top",
    color: "#2c1810",
  },
  addCommentButton: {
    backgroundColor: "#8b5a3c",
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2c1810",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  addCommentButtonText: {
    color: "#f5e6d3",
    fontSize: 24,
    fontWeight: "bold",
  },
  commentsList: {
    marginTop: 12,
    gap: 8,
  },
  commentItem: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#c4a57b",
  },
  commentBullet: {
    fontSize: 14,
  },
  commentItemText: {
    fontSize: 14,
    color: "#2c1810",
    flex: 1,
  },
  addOrderButton: {
    backgroundColor: "#8b5a3c",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#2c1810",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addOrderButtonText: {
    color: "#f5e6d3",
    fontSize: 17,
    fontWeight: "bold",
  },
  editOrderButton: {
    backgroundColor: "#f59e0b",
  },
  cancelEditButton: {
    backgroundColor: "#6b4423",
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 12,
  },
  cancelEditButtonText: {
    color: "#f5e6d3",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default OrderSection;
