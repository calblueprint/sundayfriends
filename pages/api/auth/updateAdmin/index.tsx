import { NextApiRequest, NextApiResponse } from "next";
import createError from "../../../../utils/error";
// import { AdminRecord } from "firebase-admin/lib/auth/user-record";
import firebaseApp from "../../../../firebase/firebaseApp";
import firebaseAdmin from "../../../../firebase/firebaseAdmin";
import { getAdmin } from "../../../../firebase/firestore/admin";
import { Admin } from "../../../../types/schema";

const db = firebaseApp.firestore();
const adminCollection = db.collection("admins");

// update admin data here
type UpdateAdminDTO = {
  adminUID: string;
  adminData: any;
};

/**
 * Updates the admin data from firestore with the given adminId
 */
export const updateAdmin = async (adminId: string, newData): Promise<Admin> => {
  try {
    const trimedId = adminId.toString().replace(/\s/g, "");
    await adminCollection.doc(trimedId).update(newData);
    const adminRecord = await getAdmin(trimedId);
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
        `${req.method} request is not supported on this api end point (auth/updateAdmin)`,
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
