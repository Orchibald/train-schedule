
export interface Train {
  id: string;
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
}

export interface User {
  id: string;
  email: string;
  fullname: string;
  phoneNumber: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER"
}