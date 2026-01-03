import type { Request, Response } from 'express';
import * as AuthService from '../services/auth.service.js';
import * as UserService from '../services/user.service.js';

export const register = async (req: Request, res: Response) => {
    try {
        const user = await UserService.createUser(req.body);
        res.status(201).json(user);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const token = await AuthService.loginUser(req.body);
        res.status(200).json({ token });
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
};