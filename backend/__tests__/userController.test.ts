import { registerUser } from '../src/controllers/userController.js';
// import bcrypt from 'bcryptjs'

jest.mock('../src/models/userModel', () => {
    const mockUser = {
        _id: 'user-id',
        name: 'John',
        email: 'john@john.ru',
    };

    return {
        findOne: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue(mockUser),
    };
});

jest.mock('jsonwebtoken', () => {
    return {
        sign: jest.fn().mockReturnValue('mock-token'),
    };
});

jest.mock('bcryptjs', () => {
    return {
        salt: jest.fn().mockResolvedValue('mock-salt'),
        hash: jest.fn().mockResolvedValue('mock-hash'),
    };
});

test('should register a new user', async () => {
    const req: any = {
        body: {
            name: 'John',
            email: 'john@john.ru',
            password: 'password',
        },
    };

    const res: any = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
    };

    const next: any = jest.fn();

    await registerUser(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
});
