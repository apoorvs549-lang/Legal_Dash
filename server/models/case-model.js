import { DataTypes } from 'sequelize';
import sequelize from '../config/db-connection.js';

const Case = sequelize.define('Case', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    caseType: {
        type: DataTypes.ENUM('CIVIL', 'CRIMINAL', 'CORPORATE', 'FAMILY', 'INTELLECTUAL_PROPERTY', 'REAL_ESTATE'),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('OPEN', 'IN_PROGRESS', 'PENDING', 'CLOSED'),
        defaultValue: 'OPEN',
    },
    lawyerId: { type: DataTypes.UUID, allowNull: false },
    clientId: { type: DataTypes.UUID, allowNull: false },
}, {
    tableName: 'cases',
    timestamps: true,
});

export default Case;