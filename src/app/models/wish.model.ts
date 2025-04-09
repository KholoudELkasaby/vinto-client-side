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

export interface Wishlist {
  _id: string;
  user: string;
  __v: number;
  products: Product[];
}

export interface WishlistResponse {
  status: string;
  code: number;
  data: {
    wishlist: Wishlist;
  };
  message: {
    text: string;
  };
}
