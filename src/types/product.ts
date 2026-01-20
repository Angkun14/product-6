export interface Product {
  _id: string;        // 👈 ต้องเป็น string
  name: string;
  price: number;
  colors: string[];
  description: string;
}
