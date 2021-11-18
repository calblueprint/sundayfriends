import { NextApiRequest, NextApiResponse } from 'next';
import { updateUser } from '../../../firebase/firestore/user';
import createError from '../../../utils/error';

// update user data here
type UpdateUserDTO = {
    userUID: string;
    userData: any;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method != 'POST') {
            return createError(405, `${req.method} request is not supported on this api end point (auth/updateUser)`, res);
        }
        const requestBody = JSON.parse(req.body) as UpdateUserDTO;
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