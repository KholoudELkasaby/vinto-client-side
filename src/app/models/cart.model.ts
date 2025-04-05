export interface Product {
  _id: string;
  title: string;
  price: number;
  describe: string;
  rate: number;
  discount: number;
  quantity: number;
  characteristics: string[];
  img: string[];
  addedAt: string;
  category: string;
  __v: number;
}

export interface CartItem {
  orderedItemId: string;
  product: Product;
  quantity: number;
  status: string;
  maxAllowed: number;
}

export interface Cart {
  _id: string;
  date: string;
  total: number;
  status: string;
  items: CartItem[];
  __v: number;
}

export interface CartResponse {
  code: number;
  data: {
    cart: Cart;
  };
}
