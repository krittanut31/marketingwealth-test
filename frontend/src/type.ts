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
