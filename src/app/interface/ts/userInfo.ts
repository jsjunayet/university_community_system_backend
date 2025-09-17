import { userRole } from "@prisma/client";

export interface userInfo {
  name: string;
  phone: string;
  amount: number;
  address: string;
  city: string;
  email: string;
}
export interface Iuser {
  id: string;
  role: userRole;
  isPremium: number;
}
