export interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
}

export interface Cart {
  _id: string;
  items: CartItem[];
}
