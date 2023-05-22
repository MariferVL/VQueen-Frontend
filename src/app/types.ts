export interface Order {
    id: number;
    userId: number;
    client: string;
    products: OrderProduct[];
    status: string;
    dataEntry: string;
    dateProcessed?: string;
  }
  
  export interface OrderProduct {
    qty: number;
    product: Product;
  }
  
  export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    type: string;
    dateEntry: string;
  }
  
  export interface User {
    email: string;
    password: string;
    role: string;
    id: number;
  }
  