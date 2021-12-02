import { Timestamp } from "@firebase/firestore";

export type Transaction = {
  admin_name: string;
  date: Date | Timestamp | string;
  description: string | null;
  family_id: string;
  point_gain: number;
  user_name: string;
};

export type Family = {
  total_points: number;
  family_name: string;
  user_ids: User[];
  family_id: string;
};

export type Admin = {
  created_at: Date | Timestamp | string;
  email: string;
  name: string;
};

export type User = {
  address: string;
  created_at: Date | Timestamp | string;
  email: string;
  role: string;
  family_id: number;
  full_name: string;
  last_active: Date | Timestamp;
  parent: boolean;
  points: number;
  reward_eligible: boolean;
  suspended: boolean;
  phone_number: string;
  transactions: Transaction[];
};
