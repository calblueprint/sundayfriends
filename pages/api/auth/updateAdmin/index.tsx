import { NextApiRequest, NextApiResponse } from "next";
import createError from "../../../../utils/error";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import firebaseApp from "../../../../firebase/firebaseApp";
import firebaseAdmin from "../../../../firebase/firebaseAdmin";
import { Admin } from "../../../../types/schema";

const db = firebaseApp.firestore();
const adminCollection = db.collection("admins");

type UpdateAdminDTO = {
    adminUID: string;
    adminData: any;
};

export const updateAdmin = async (
    adminID: string,
    newData
): Promise<UserRecord> => {
    try {
        const trimedID = adminID.toString().replace(/\s/g, "");
        await adminCollection.doc(trimedID).update(newData);
        const adminRecord = await firebaseAdmin
            .auth()
            .updateUser(trimedID, newData);
        return adminRecord;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method != "POST") {
            return createError(
                405,
                `${req.method} request is not supported on this api end point (auth/updateUser)`,
                res
            );
        }
        const requestBody = req.body as UpdateAdminDTO;
        const updatedAdminRecord = await updateAdmin(
            requestBody.adminUID,
            requestBody.adminData
        );
        if (updatedAdminRecord) {
            return res.status(200).json(updatedAdminRecord);
        }
        return createError(400, "Could not finish updating admin data", res);
    } catch (err) {
        return createError(500, err.message, res);
    }
};

export default handler;