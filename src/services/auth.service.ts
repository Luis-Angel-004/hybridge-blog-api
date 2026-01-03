import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import * as UserService from './user.service.js';
import type { UserCredentials } from '../types/user.js';

export const loginUser = async (credentials: UserCredentials): Promise<string> => {
    const user = UserService.findByEmail(credentials.email);
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    return token;
};