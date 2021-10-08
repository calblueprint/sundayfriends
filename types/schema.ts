import { Timestamp } from "@firebase/firestore"

export type Transaction = {
    adminId: string;
    date: Date | Timestamp;
    description: string | null;
    familyId: string;
    pointGain: number;
    userId: string;
}