export type formType = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export type ItemCardType = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  favorite: boolean;
  description: string;
  category: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  description: string;
  category: string;
};
export type CartItem = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  createdAt: string; 
  product: Product;
};

export type CartItemListType = {
  cartData: CartItem[];
  length: number;
  totalPrice: number;
  totalQuantity: number;
};
