import { DataTypes } from 'sequelize';
import sequelize from '../config/db-connection.js';

const AssignedCase = sequelize.define('AssignedCase', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'Case name cannot be empty' },
        },
    },
    caseType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'case_type',
        validate: {
            notEmpty: { msg: 'caseType cannot be empty' },
        },
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Active',
    },
}, {
    tableName: 'assigned_cases',
    timestamps: true,
    underscored: true,
});

export default AssignedCase;
