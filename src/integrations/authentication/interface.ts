import { Request, Response, NextFunction } from "express";

export interface Authentication {
    /**
     * Return a middleware to be used on non-public routes, should reject non-authenticated access
     */
    middleware(): (req: Request, res: Response, next: NextFunction) => void;
}
