import { DataTypes } from 'sequelize';
import sequelize from '../config/db-connection.js';

const AuditLog = sequelize.define('AuditLog', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    action: {
        type: DataTypes.ENUM(
            'CREATE_CASE', 'UPDATE_CASE', 'CLOSE_CASE', 'REOPEN_CASE',
            'ADD_DOCUMENT', 'UPDATE_DOCUMENT', 'DELETE_DOCUMENT',
            'ADD_NOTE', 'UPDATE_NOTE', 'DELETE_NOTE',
            'ASSIGN_LAWYER', 'SCHEDULE_HEARING', 'FILE_MOTION'
        ),
        allowNull: false,
    },
    severity: {
        type: DataTypes.ENUM('INFO', 'WARNING', 'CRITICAL'),
        defaultValue: 'INFO',
        allowNull: false,
    },
    currentBottleneck: { type: DataTypes.STRING, allowNull: true },
    velocityScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0, max: 100 },
    },
    metadata: { type: DataTypes.JSONB, defaultValue: {} },
    lawyerId: { type: DataTypes.UUID, allowNull: false },
    clientId: { type: DataTypes.UUID, allowNull: false },
    caseId: { type: DataTypes.UUID, allowNull: false },
}, {
    tableName: 'audit_logs',
    timestamps: true,
    updatedAt: false,
});

export default AuditLog;