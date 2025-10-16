import AsyncStorage from '@react-native-async-storage/async-storage';
import { Order } from '../types';

export const saveOrdersToStorage = async (orders: Order[]): Promise<void> => {
  try {
    await AsyncStorage.setItem('@restaurant_orders', JSON.stringify(orders));
    console.log('Commandes sauvegardées avec succès');
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
    throw new Error("Impossible de sauvegarder les commandes");
  }
};

export const loadOrdersFromStorage = async (): Promise<Order[]> => {
  try {
    const storedOrders = await AsyncStorage.getItem('@restaurant_orders');
    if (storedOrders !== null) {
      return JSON.parse(storedOrders);
    }
    return [];
  } catch (error) {
    console.error('Erreur lors du chargement:', error);
    throw new Error("Impossible de charger les commandes sauvegardées");
  }
};

export const clearAllOrders = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('@restaurant_orders');
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    throw new Error("Impossible de supprimer les commandes");
  }
};