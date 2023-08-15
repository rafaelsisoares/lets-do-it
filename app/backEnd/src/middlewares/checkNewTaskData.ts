import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    const { task, userId } = req.body;
    if (!task || !userId) {
        return res.status(400).json({ message: 'Invalid values' })
    }
    next();
}