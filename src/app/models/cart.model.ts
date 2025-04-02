export interface CartItem {
  _id: string;
  ItemsOrdered: string[];
  status: string;
  total: number;
  user: string;
  date: string;
  __v: number;
}

export interface Cart {
  code: number;
  data: {
    cart: CartItem[];
  };
}
