export interface Order {
    id: number;
    userId: number;
    client: string;
    products: ProductWithQty[];
    status: string;
    dateEntry: string;
    dateProcessed?: string;
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
  
  export interface ProductWithQty extends Product {
    qty: number;
  }
  