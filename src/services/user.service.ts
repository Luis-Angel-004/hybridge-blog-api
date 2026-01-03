import bcrypt from 'bcrypt';
import type { User, UserCredentials } from '../types/user.js';

const users: User[] = [];
let nextId = 1;

const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync('password123', salt);
users.push({ id: nextId++, email: 'test@example.com', password: hashedPassword });

export const findByEmail = (email: string): User | undefined => {
    return users.find(user => user.email === email);
};

export const findById = (id: number): User | undefined => {
    return users.find(user => user.id === id);
};

export const createUser = async (data: UserCredentials): Promise<Omit<User, 'password'>> => {
    if (findByEmail(data.email)) {
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(data.password, salt);

    const newUser: User = {
        id: nextId++,
        email: data.email,
        password,
    };
    users.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
};