import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";

// Composants - CHEMINS CORRIGÉS
import Header from '../components/Header';
import CategorySelector from '../components/CategorySelector';
import DishGrid from '../components/DishGrid';
import OrderSection from '../components/OrderSection';
import CartModal from '../components/CartModal';

// Données et utilitaires
import { menuData } from '../data/menuData';
import { loadOrdersFromStorage, saveOrdersToStorage, clearAllOrders } from '../utils/storage';
import { Dish, Order } from '../types';

export default function App() {
  // États
  const [selectedDish, setSelectedDish] = useState<(Dish & { category: string }) | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeCategory, setActiveCategory] = useState("salades");
  const [showCart, setShowCart] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Chargement des données
  useEffect(() => {
    loadInitialData();
  }, []);

  // Sauvegarde automatique
  useEffect(() => {
    if (!isLoading) {
      saveOrdersToStorage(orders);
    }
  }, [orders, isLoading]);

  const loadInitialData = async () => {
    try {
      const storedOrders = await loadOrdersFromStorage();
      setOrders(storedOrders);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de charger les commandes sauvegardées");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddOrder = () => {
    if (!selectedDish) {
      Alert.alert("Erreur", "Veuillez sélectionner un plat");
      return;
    }

    const newOrder: Order = {
      id: Date.now(),
      dish: selectedDish.name,
      category: selectedDish.category,
      quantity,
      comments: [...comments],
      total: selectedDish.price * quantity,
      image: selectedDish.image,
      price: selectedDish.price,
      createdAt: new Date().toISOString(),
    };

    setOrders([...orders, newOrder]);
    resetOrderForm();
    Alert.alert("Succès", "Commande ajoutée avec succès!");
  };

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order);
    setSelectedDish({
      id: order.id,
      name: order.dish,
      price: order.price,
      description: "",
      image: order.image,
      category: order.category
    });
    setQuantity(order.quantity);
    setComments(order.comments);
    setShowCart(false);
  };

  const handleUpdateOrder = () => {
    if (!selectedDish || !editingOrder) {
      Alert.alert("Erreur", "Aucune commande à modifier");
      return;
    }

    const updatedOrder: Order = {
      ...editingOrder,
      quantity,
      comments: [...comments],
      total: selectedDish.price * quantity,
      updatedAt: new Date().toISOString(),
    };

    setOrders(orders.map(order =>
      order.id === editingOrder.id ? updatedOrder : order
    ));

    resetOrderForm();
    Alert.alert("Succès", "Commande modifiée avec succès!");
  };

  const resetOrderForm = () => {
    setEditingOrder(null);
    setSelectedDish(null);
    setQuantity(1);
    setComments([]);
    setCommentInput("");
  };

  const handleRemoveOrder = (orderId: number) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  const handleClearAllOrders = async () => {
    try {
      await clearAllOrders();
      setOrders([]);
      Alert.alert("Succès", "Toutes les commandes ont été supprimées");
    } catch (error) {
      Alert.alert("Erreur", "Impossible de supprimer les commandes");
    }
  };

  const categories = Object.keys(menuData);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Header ordersCount={orders.length} onCartPress={() => setShowCart(true)} />

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Notre Menu</Text>
          <CategorySelector
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <DishGrid
            dishes={menuData[activeCategory]}
            category={activeCategory}
            selectedDish={selectedDish}
            onSelectDish={setSelectedDish}
            onResetForm={resetOrderForm}
          />
        </View>

        {(selectedDish || editingOrder) && (
          <OrderSection
            selectedDish={selectedDish}
            editingOrder={editingOrder}
            quantity={quantity}
            setQuantity={setQuantity}
            commentInput={commentInput}
            setCommentInput={setCommentInput}
            comments={comments}
            setComments={setComments}
            onAddOrder={handleAddOrder}
            onUpdateOrder={handleUpdateOrder}
            onCancelEdit={resetOrderForm}
          />
        )}
      </ScrollView>

      <CartModal
        visible={showCart}
        orders={orders}
        isLoading={isLoading}
        onClose={() => setShowCart(false)}
        onEditOrder={handleEditOrder}
        onRemoveOrder={handleRemoveOrder}
        onClearAllOrders={handleClearAllOrders}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc"
  },
  scrollView: {
    flex: 1,
  },
  menuSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 20,
  },
});