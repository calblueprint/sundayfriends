import { Timestamp } from "@firebase/firestore";

export type Transaction = {
  transaction_id: string;
  expire_id: string | null;
  admin_name: string;
  date: Date | Timestamp | string;
  deleteDate: Date | Timestamp | string;
  description: string | null;
  family_id: string;
  point_gain: number;
  user_name: string;
  user_id: string;
};

export type Family = {
  total_points: number;
  family_name: string;
  last_active: Date | Timestamp;
  user_ids: string[];
  users: User[];
  family_id: number;
};

export type Admin = {
  admin_id: string;
  created_at: Date | Timestamp | string;
  last_active: Date | Timestamp | string;
  email: string;
  name: string;
  role: string;
  phone: string;
};

export type AdminInvite = {
  email: string;
  full_name: string;
  valid: boolean;
};

export type User = {
  user_id: string;
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

export type User_Invite = {
  family_id: number;
  name: string;
  email: string;
  status: string;
  user_invite_id: string;
};

export type Family_Counter = {
  counter: number;
};