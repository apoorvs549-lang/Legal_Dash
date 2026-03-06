import { Op } from 'sequelize';
import Lawyer from '../models/user-model.js';
import Case from '../models/case-model.js';
import Client from '../models/client-model.js';

import AuditLog from '../models/audit-model.js';


const LAWYER_ATTRS = ['id', 'email'];
const CLIENT_ATTRS = ['id', 'name'];
const CASE_ATTRS = ['id', 'title', 'caseType'];

export const getAuditLogs = async ({ page = 1, limit = 20, lawyerId, clientId, caseType, severity, sortBy = 'createdAt', order = 'DESC' }) => {
    const offset = (page - 1) * limit;
    const where = {};
    const caseWhere = {};

    if (lawyerId) where.lawyerId = lawyerId;
    if (clientId) where.clientId = clientId;
    if (severity) where.severity = severity;
    if (caseType) caseWhere.caseType = caseType;

    const validSortFields = ['createdAt', 'severity', 'velocityScore', 'action'];
    const safeSort = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const safeOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const { count, rows } = await AuditLog.findAndCountAll({
        where,
        include: [
            { model: Lawyer, as: 'lawyer', attributes: LAWYER_ATTRS },
            { model: Client, as: 'client', attributes: CLIENT_ATTRS },
            { model: Case, as: 'case', attributes: CASE_ATTRS, where: Object.keys(caseWhere).length ? caseWhere : undefined },
        ],
        order: [[safeSort, safeOrder]],
        limit: parseInt(limit),
        offset,
        distinct: true,
    });

    return {
        data: rows,
        pagination: {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit),
        },
    };
};

export const createAuditLog = async (payload) => {
    return AuditLog.create(payload);
};

export const getDashboardStats = async () => {
    const [total, bySeverity, recentLogs, avgVelocity] = await Promise.all([
        AuditLog.count(),
        AuditLog.findAll({
            attributes: ['severity', [AuditLog.sequelize.fn('COUNT', AuditLog.sequelize.col('id')), 'count']],
            group: ['severity'],
            raw: true,
        }),
        AuditLog.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']],
            include: [
                { model: Lawyer, as: 'lawyer', attributes: LAWYER_ATTRS },
                { model: Client, as: 'client', attributes: CLIENT_ATTRS },
                { model: Case, as: 'case', attributes: CASE_ATTRS },
            ],
        }),
        AuditLog.findOne({
            attributes: [[AuditLog.sequelize.fn('AVG', AuditLog.sequelize.col('velocityScore')), 'avg']],
            raw: true,
        }),
    ]);

    const severityMap = { INFO: 0, WARNING: 0, CRITICAL: 0 };
    bySeverity.forEach(({ severity, count }) => { severityMap[severity] = parseInt(count); });

    return {
        total,
        bySeverity: severityMap,
        avgVelocityScore: parseFloat(avgVelocity?.avg || 0).toFixed(1),
        recentLogs,
    };
};