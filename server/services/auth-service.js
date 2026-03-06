import jwt from 'jsonwebtoken';
import User from '../models/user-model.js';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Generate a signed JWT for a given user.
 */
function generateToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN },
    );
}

/**
 * Verify and decode a JWT token.
 */
export function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

/**
 * Register a new user.
 * @returns {{ user: object, token: string }}
 */
export async function signup({ email, password, role = 'client' }) {
    const existing = await User.findOne({ where: { email } });
    if (existing) {
        const err = new Error('An account with this email already exists');
        err.statusCode = 409;
        throw err;
    }

    // Only allow 'client' or 'lawyer' from public signup
    const safeRole = ['client', 'lawyer'].includes(role) ? role : 'client';

    const user = await User.create({ email, password, role: safeRole });
    const token = generateToken(user);

    return {
        user: { id: user.id, email: user.email, role: user.role },
        token,
    };
}

/**
 * Authenticate a user by email + password.
 * @returns {{ user: object, token: string }}
 */
export async function login({ email, password }) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        const err = new Error('Wrong credentials');
        err.statusCode = 401;
        throw err;
    }

    const valid = await user.validatePassword(password);
    if (!valid) {
        const err = new Error('Wrong credentials');
        err.statusCode = 401;
        throw err;
    }

    const token = generateToken(user);

    return {
        user: { id: user.id, email: user.email, role: user.role },
        token,
    };
}
