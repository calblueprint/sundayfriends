import { Timestamp } from "@firebase/firestore"

export type Transaction = {
    adminId: string;
    date: Date | Timestamp;
    description: string | null;
    familyId: string;
    pointGain: number;
    userId: string;
}

export type Admin = {
    created_at: Date | Timestamp;
    email: string;
    full_name: string;
}

export type User = {
    address: string,
    created_at: Date | Timestamp;
    //more stuff
    full_name: string,
}