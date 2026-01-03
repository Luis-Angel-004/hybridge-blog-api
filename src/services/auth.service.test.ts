import { describe, it, expect } from 'vitest';
import jwt from 'jsonwebtoken';
import * as AuthService from './auth.service.js';
import { JWT_SECRET } from '../config.js';

describe('Auth Service', () => {

    describe('loginUser', () => {
        it('should return JWT token with valid credentials', async () => {
            const credentials = {
                email: 'test@example.com',
                password: 'password123'
            };

            const token = await AuthService.loginUser(credentials);

            expect(token).toBeDefined();
            expect(typeof token).toBe('string');
            expect(token.split('.')).toHaveLength(3);
        });

        it('should include user data in JWT payload', async () => {
            const credentials = {
                email: 'test@example.com',
                password: 'password123'
            };

            const token = await AuthService.loginUser(credentials);
            const decoded = jwt.verify(token, JWT_SECRET) as any;

            expect(decoded.sub).toBe(1);
            expect(decoded.email).toBe('test@example.com');
            expect(decoded.exp).toBeDefined();
        });

        it('should throw error with invalid email', async () => {
            const credentials = {
                email: 'nonexistent@example.com',
                password: 'password123'
            };

            await expect(AuthService.loginUser(credentials)).rejects.toThrow('Invalid credentials');
        });

        it('should throw error with invalid password', async () => {
            const credentials = {
                email: 'test@example.com',
                password: 'wrongpassword'
            };

            await expect(AuthService.loginUser(credentials)).rejects.toThrow('Invalid credentials');
        });

        it('should create token that expires in 1 hour', async () => {
            const credentials = {
                email: 'test@example.com',
                password: 'password123'
            };

            const token = await AuthService.loginUser(credentials);
            const decoded = jwt.verify(token, JWT_SECRET) as any;

            const now = Math.floor(Date.now() / 1000);
            const expectedExpiration = now + 3600;

            expect(decoded.exp).toBeGreaterThan(now);
            expect(decoded.exp).toBeLessThanOrEqual(expectedExpiration + 5);
        });
    });
});
