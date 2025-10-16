import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  StyleSheet,
} from 'react-native';
import { Order } from '../types';
import OrderItem from './OrderItem';

interface CartModalProps {
  visible: boolean;
  orders: Order[];
  isLoading: boolean;
  onClose: () => void;
  onEditOrder: (order: Order) => void;
  onRemoveOrder: (orderId: number) => void;
  onClearAllOrders: () => void;
}

const CartModal: React.FC<CartModalProps> = ({
  visible,
  orders,
  isLoading,
  onClose,
  onEditOrder,
  onRemoveOrder,
  onClearAllOrders,
}) => {
  const totalPrice = orders.reduce((sum, o) => sum + o.total, 0);

  const handleClearAll = () => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment supprimer toutes les commandes ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Supprimer", style: "destructive", onPress: onClearAllOrders }
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
        {/* Header avec le thème café */}
        <View style={styles.modalHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onClose}
          >
            <Text style={styles.backButtonText}>← Retour</Text>
          </TouchableOpacity>

          <View style={styles.titleSection}>
            <Text style={styles.cartIcon}>🛒</Text>
            <Text style={styles.modalTitle}>Votre Panier</Text>
          </View>

          {orders.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearAll}
            >
              <Text style={styles.clearButtonText}>🗑️</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Ligne décorative */}
        <View style={styles.decorativeLine}>
          <View style={styles.lineLeft} />
          <Text style={styles.decorativeIcon}>☕</Text>
          <View style={styles.lineRight} />
        </View>

        <ScrollView style={styles.modalContent}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingIcon}>☕</Text>
              <Text style={styles.loadingText}>Préparation de votre commande...</Text>
            </View>
          ) : orders.length === 0 ? (
            <View style={styles.emptyCart}>
              <Text style={styles.emptyCartIcon}>☕</Text>
              <Text style={styles.emptyCartText}>Votre panier est vide</Text>
              <Text style={styles.emptyCartSubtext}>
                Découvrez nos délicieux cafés tunisiens
              </Text>
              <TouchableOpacity
                style={styles.backToMenuButton}
                onPress={onClose}
              >
                <Text style={styles.backToMenuButtonText}>Voir le menu</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.cartHeader}>
                <Text style={styles.cartTitle}>Vos articles</Text>
                <View style={styles.cartCountBadge}>
                  <Text style={styles.cartCount}>{orders.length} article{orders.length > 1 ? 's' : ''}</Text>
                </View>
              </View>

              {orders.map((item) => (
                <OrderItem
                  key={item.id}
                  item={item}
                  onEdit={onEditOrder}
                  onRemove={onRemoveOrder}
                />
              ))}

              <View style={styles.totalSection}>
                <View style={styles.totalLabelContainer}>
                  <Text style={styles.totalIcon}>💰</Text>
                  <Text style={styles.totalLabel}>Total</Text>
                </View>
                <Text style={styles.totalAmount}>{totalPrice.toFixed(2)} DT</Text>
              </View>

              <TouchableOpacity style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>☕ Commander maintenant</Text>
              </TouchableOpacity>

              <View style={styles.storageInfoContainer}>
                <Text style={styles.storageIcon}>💾</Text>
                <Text style={styles.storageInfo}>
                  Vos commandes sont sauvegardées automatiquement
                </Text>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#f5e6d3",
  },
  modalHeader: {
    backgroundColor: "#2c1810",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  titleSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cartIcon: {
    fontSize: 28,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f5e6d3",
    letterSpacing: 0.5,
  },
  backButton: {
    backgroundColor: "#8b5a3c",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    color: "#f5e6d3",
    fontSize: 14,
    fontWeight: "600",
  },
  clearButton: {
    backgroundColor: "#dc2626",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  clearButtonText: {
    fontSize: 18,
  },
  decorativeLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#2c1810",
    paddingBottom: 15,
    marginBottom: 20,
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
  modalContent: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    alignItems: "center",
    padding: 40,
    marginTop: 50,
  },
  loadingIcon: {
    fontSize: 60,
    marginBottom: 20,
    opacity: 0.5,
  },
  loadingText: {
    fontSize: 16,
    color: "#8b5a3c",
    fontStyle: "italic",
  },
  emptyCart: {
    alignItems: "center",
    padding: 40,
    marginTop: 50,
  },
  emptyCartIcon: {
    fontSize: 80,
    marginBottom: 20,
    opacity: 0.3,
  },
  emptyCartText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c1810",
    marginBottom: 8,
  },
  emptyCartSubtext: {
    fontSize: 16,
    color: "#8b5a3c",
    textAlign: "center",
    marginBottom: 30,
    fontStyle: "italic",
  },
  backToMenuButton: {
    backgroundColor: "#8b5a3c",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  backToMenuButtonText: {
    color: "#f5e6d3",
    fontSize: 16,
    fontWeight: "bold",
  },
  cartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#c4a57b",
  },
  cartTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c1810",
    letterSpacing: 0.5,
  },
  cartCountBadge: {
    backgroundColor: "#8b5a3c",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  cartCount: {
    fontSize: 13,
    color: "#f5e6d3",
    fontWeight: "600",
  },
  totalSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: "#2c1810",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  totalLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  totalIcon: {
    fontSize: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f5e6d3",
  },
  totalAmount: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#c4a57b",
    letterSpacing: 0.5,
  },
  checkoutButton: {
    backgroundColor: "#8b5a3c",
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  checkoutButtonText: {
    color: "#f5e6d3",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  storageInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 25,
    marginBottom: 10,
  },
  storageIcon: {
    fontSize: 16,
    opacity: 0.6,
  },
  storageInfo: {
    fontSize: 12,
    color: "#8b5a3c",
    fontStyle: "italic",
  },
});

export default CartModal;