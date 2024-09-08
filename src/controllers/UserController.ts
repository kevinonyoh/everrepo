import { Request, Response } from 'express';
import User from '../models/User';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
   
    const { name, email, password } = req.body;
    try {
 
        const users = await User.findOne({where: {email}});

        if(users) res.status(400).json({message:"this email address already exist"});

        const hash = await bcrypt.hashSync(password, 10);
        
        const payload = {
            name,
            email,
            password: hash
        }

         const data = await User.create(payload);
        res.status(201).json(data.toJSON());

       
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({where: {email: req.user?.email}});
      res.status(200).json(user?.toJSON());

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const loginUser = async (req: Request, res: Response) =>{
     const {email, password} = req.body;
     try {

        const users = await User.findOne({where: {email}});

        if(!users) return res.status(402).json({message: "email does not exist"});

        const val = await bcrypt.compareSync(password, users?.password as string);
        
        if(!val) return res.status(402).json({message: "incorrect paasword"});


         const data = users?.toJSON();

         const secret = process.env.SECRET as string;
      
         const accessToken = jwt.sign({ email: data.email, id: data.id }, secret);
         const value = {
            ...data,
            accessToken
         }
         
         res.status(201).json(value);



     } catch (error) {
        
     }
}