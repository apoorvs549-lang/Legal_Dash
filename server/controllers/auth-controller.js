import { z } from 'zod';
import * as authService from '../services/auth-service.js';

const loginSchema = z.object({
    email: z.string().email('Enter a valid email'),
    password: z.string().min(4, 'Password must be at least 4 characters'),
});

const signupSchema = loginSchema.extend({
    role: z.enum(['client', 'lawyer']).default('client'),
});

/**
 * Cookie options for the JWT token.
 * httpOnly = true   → JS cannot read it  (XSS protection)
 * secure   = true   → only sent over HTTPS (set false for localhost dev)
 * sameSite = 'lax'  → sent on same-site navigations (CSRF protection)
 * path     = '/'    → available for every route
 * maxAge   = 7 days (in seconds)
 */
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: false,   // Must be false for HTTP deployments; set true only when HTTPS is configured
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
};

/**
 * POST /api/v1/auth/signup
 */
export async function signup(request, reply) {
    try {
        const parsed = signupSchema.safeParse(request.body);
        if (!parsed.success) {
            return reply.code(400).send({
                success: false,
                message: 'Validation failed',
                errors: parsed.error.flatten().fieldErrors,
            });
        }

        const { user, token } = await authService.signup(parsed.data);

        // Set the JWT as a secure HttpOnly cookie
        reply.setCookie('token', token, COOKIE_OPTIONS);

        return reply.code(201).send({
            success: true,
            message: 'Account created successfully',
            data: user,
        });
    } catch (error) {
        const status = error.statusCode || 500;
        return reply.code(status).send({
            success: false,
            message: error.message || 'Signup failed',
        });
    }
}

/**
 * POST /api/v1/auth/login
 */
export async function login(request, reply) {
    try {
        const parsed = loginSchema.safeParse(request.body);
        if (!parsed.success) {
            return reply.code(400).send({
                success: false,
                message: 'Validation failed',
                errors: parsed.error.flatten().fieldErrors,
            });
        }

        const { user, token } = await authService.login(parsed.data);

        // Set the JWT as a secure HttpOnly cookie
        reply.setCookie('token', token, COOKIE_OPTIONS);

        return reply.code(200).send({
            success: true,
            message: 'Login successful',
            data: user,
        });
    } catch (error) {
        const status = error.statusCode || 500;
        return reply.code(status).send({
            success: false,
            message: error.message || 'Login failed',
        });
    }
}

/**
 * GET /api/v1/auth/me  – returns the logged-in user from the JWT cookie
 */
export async function me(request, reply) {
    return reply.code(200).send({
        success: true,
        data: request.user, // set by the authenticate middleware
    });
}

/**
 * POST /api/v1/auth/logout – clears the token cookie
 */
export async function logout(request, reply) {
    reply.clearCookie('token', { path: '/' });

    return reply.code(200).send({
        success: true,
        message: 'Logged out successfully',
    });
}
