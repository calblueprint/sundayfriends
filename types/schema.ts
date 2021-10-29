import { Timestamp } from "@firebase/firestore";

export type Transaction = {
    admin_name: string;
    date: Date | Timestamp;
    description: string | null;
    family_id: string;
    point_gain: number;
    user_name: string;
}

export type Admin = {
    created_at: Date | Timestamp;
    email: string;
    full_name: string;
}

export type Family = {
    totalPoints: number;
    familyName: string;
    userIds: User[];
    familyId: number;
    totalTransactions: number;
  };

export type User = {
    address: string;
    created_at: Date | Timestamp;
    email: string;
    family_head: boolean;
    family_id: number;
    full_name: string;
    last_active: Date | Timestamp;
    parent: boolean;
    points: number;
    reward_eligible: boolean;
    suspended: boolean;
  };
