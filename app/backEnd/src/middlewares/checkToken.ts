import { Request, Response, NextFunction } from "express";
import decodeToken from "../utils/decodeToken";

export default async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(400).json({ message: 'Token not found' });
    }

    try {
        decodeToken(authorization);
        next();
    } catch (e) {
        console.error(e);
        return res.status(401).json({ message: 'Access denied' });
    }
};