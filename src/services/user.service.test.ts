import { describe, it, expect, beforeEach } from 'vitest';
import * as UserService from './user.service.js';

describe('User Service', () => {

    describe('findByEmail', () => {
        it('should find existing user by email', () => {
            const user = UserService.findByEmail('test@example.com');
            expect(user).toBeDefined();
            expect(user?.email).toBe('test@example.com');
        });

        it('should return undefined for non-existing email', () => {
            const user = UserService.findByEmail('nonexistent@example.com');
            expect(user).toBeUndefined();
        });
    });

    describe('findById', () => {
        it('should find existing user by id', () => {
            const user = UserService.findById(1);
            expect(user).toBeDefined();
            expect(user?.id).toBe(1);
        });

        it('should return undefined for non-existing id', () => {
            const user = UserService.findById(999);
            expect(user).toBeUndefined();
        });
    });

    describe('createUser', () => {
        it('should create a new user with hashed password', async () => {
            const userData = {
                email: 'newuser@example.com',
                password: 'securepassword123'
            };

            const createdUser = await UserService.createUser(userData);

            expect(createdUser).toBeDefined();
            expect(createdUser.email).toBe(userData.email);
            expect(createdUser).not.toHaveProperty('password');
            expect(createdUser.id).toBeGreaterThan(1);
        });

        it('should throw error when creating user with duplicate email', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'password123'
            };

            await expect(UserService.createUser(userData)).rejects.toThrow('User already exists');
        });

        it('should hash the password correctly', async () => {
            const userData = {
                email: 'hashtest@example.com',
                password: 'plaintextpassword'
            };

            await UserService.createUser(userData);
            const user = UserService.findByEmail('hashtest@example.com');

            expect(user).toBeDefined();
            expect(user?.password).not.toBe(userData.password);
            expect(user?.password).toMatch(/^\$2[aby]\$\d{2}\$/);
        });
    });
});
