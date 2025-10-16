export interface Dish {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface Order {
  id: number;
  dish: string;
  category: string;
  quantity: number;
  comments: string[];
  total: number;
  image: string;
  price: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Menu {
  [key: string]: Dish[];
}