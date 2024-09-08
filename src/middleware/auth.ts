import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { IUser } from '../interfaces/auth.interface.js';



const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    try {
        if (!token) {
         return   res.status(401).json({ error: 'Valid token is required' }); 
        }

        const _token = token.replace(/(Bearer\s|bearer\s)/, '');
        
        const secret = process.env.SECRET as string
        const decoded = await jwt.verify(_token, secret) as JwtPayload;

        const user: IUser = {
            id: decoded.id,
            email: decoded.email,
        };
    
        req.user = user;
        
        next();
    } catch (err) {
        next(err);
    }
};

export default auth;