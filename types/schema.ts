import { firestore } from "firebase-admin";

export type Transaction = {
  transaction_id: string;
  expire_id: string | null;
  admin_name: string;
  date: Date | firestore.Timestamp | string;
  deleteDate: Date | firestore.Timestamp | string;
  description: string | null;
  family_id: string;
  point_gain: number;
  user_name: string;
  user_id: string;
};

export type Family = {
  total_points: number;
  family_name: string;
  last_active: Date | firestore.Timestamp;
  user_ids: string[];
  users: User[];
  family_id: number;
};

export type Admin = {
  created_at: Date | firestore.Timestamp | string;
  last_active: Date | firestore.Timestamp | string;
  email: string;
  name: string;
  role: string;
  phone: string;
  admin_id: string;
};

export type AdminInvite = {
  adminInviteId: string;
  email: string;
  full_name: string;
  valid: boolean;
};

export type User = {
  user_id: string;
  address: string;
  created_at: Date | firestore.Timestamp | string;
  email: string;
  role: string;
  family_id: number;
  full_name: string;
  last_active: Date | firestore.Timestamp;
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
