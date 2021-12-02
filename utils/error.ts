import { NextApiResponse } from "next";

// generic error handler
const createError = (status: number, message: string, res: NextApiResponse): void => {
    return res.status(status).json({
        error: {
            message
        }
    })
}

export default createError;