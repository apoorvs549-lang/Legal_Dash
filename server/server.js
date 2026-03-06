import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

import sequelize from './config/db-connection.js';
import Document from './models/document-model.js';
import Client from './models/client-model.js';
import User from './models/user-model.js';
import Case from './models/case-model.js';
import AuditLog from './models/audit-model.js';

// Setup paths for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define DB Associations needed for AuditLogs
AuditLog.belongsTo(User, { as: 'lawyer', foreignKey: 'lawyerId' });
User.hasMany(AuditLog, { as: 'auditLogs', foreignKey: 'lawyerId' });

AuditLog.belongsTo(Client, { as: 'client', foreignKey: 'clientId' });
Client.hasMany(AuditLog, { as: 'auditLogs', foreignKey: 'clientId' });

AuditLog.belongsTo(Case, { as: 'case', foreignKey: 'caseId' });
Case.hasMany(AuditLog, { as: 'auditLogs', foreignKey: 'caseId' });

import documentRoutes from './routes/document-routes.js';
import clientRoutes from './routes/client-routes.js';
import authRoutes from './routes/auth-routes.js';
import auditRoutes from './routes/audit-routes.js';
import activityFeedRoutes from './routes/activity-feed-routes.js';
import AssignedCase from './models/assigned-case-model.js';

const fastify = Fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
        },
    },
});

// Register Plugins 

// File uploads
fastify.register(multipart);

// Serve static files from the uploads directory
fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'uploads'),
    prefix: '/uploads/',
});

// CORS – allow the Vite dev server (usually port 5173) with credentials
fastify.register(cors, {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
});

// Cookie parser – needed for reading/setting HttpOnly cookies
fastify.register(cookie);

// Register Routes 

fastify.register(documentRoutes, { prefix: '/api/documents' });
fastify.register(clientRoutes, { prefix: '/api/v1/clients' });
fastify.register(authRoutes, { prefix: '/api/v1/auth' });
fastify.register(auditRoutes, { prefix: '/api' });
fastify.register(activityFeedRoutes, { prefix: '/api/v1/cases' });

// Health Check 

fastify.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
});

// Start Server 

const start = async () => {
    try {
        // 1. Test database connection
        await sequelize.authenticate();
        fastify.log.info('✅ Database connection established');

        // 2. Ensure uploads directory exists
        const uploadDir = path.join(__dirname, 'uploads');
        try {
            await fs.mkdir(uploadDir, { recursive: true });
        } catch (err) {
            fastify.log.error('Failed to create uploads directory:', err);
        }

        // 3. Sync models (creates/alters the "documents" table)
        await sequelize.sync({ alter: true });
        fastify.log.info('✅ Database models synced');

        // 4. Start the Fastify server
        const port = parseInt(process.env.PORT, 10) || 3000;
        const host = process.env.HOST || '0.0.0.0';

        await fastify.listen({ port, host });
        fastify.log.info(`🚀 Server listening on http://${host}:${port}`);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
};

start();