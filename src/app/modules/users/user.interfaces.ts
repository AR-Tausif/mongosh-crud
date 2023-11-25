export interface UserData {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: [
    {
      productName: string;
      price: number;
      quantity: number;
    },
  ];
}
interface Order {
  productName: string;
  price: number;
  quantity: number;
}

interface FullName {
  firstName: string;
  lastName: string;
}

interface Address {
  street: string;
  city: string;
  country: string;
}

export interface User {
  userId: number;
  username: string;
  password: string;
  fullName: FullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: Address;
  orders?: Order[];
}
