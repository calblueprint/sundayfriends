import { NextApiRequest, NextApiResponse } from 'next';
import createError from '../../../../utils/error';
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import firebaseApp from '../../../../firebase/firebaseApp';
import firebaseAdmin from '../../../../firebase/firebaseAdmin';

const db = firebaseApp.firestore();
const userCollection = db.collection("users");

// update user data here
type UpdateUserDTO = {
    userUID: string;
    userData: any;
}

/**
 * Updates the user data from firestore with the given userId
 */
export const updateUser = async (userId: string, newData): Promise<UserRecord> => {
    try {
        const trimedId = userId.toString().replace(/\s/g, "");
        await userCollection.doc(trimedId).update(newData);
        const userRecord = await firebaseAdmin.auth().updateUser(trimedId, newData);
        return userRecord;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method != 'POST') {
            return createError(405, `${req.method} request is not supported on this api end point (auth/updateUser)`, res);
        }
        const requestBody = req.body as UpdateUserDTO;
        const updatedUserRecord = await updateUser(requestBody.userUID, requestBody.userData);
        if (updatedUserRecord) {
            return res.status(200).json(updatedUserRecord);
        }
        return createError(400, "Could not finish updating user data", res);
    } catch (err) {
        return createError(500, err.message, res);
    }
}

export default handler;