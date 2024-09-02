import { Request, Response } from 'express';
import User from '../models/User';

export const createUser = async (req: Request, res: Response) => {
   
    const { name, email } = req.body;
    try {
        const user = await User.create({ name, email });
        res.status(201).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        
         const users = await User.findAll();
          res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};