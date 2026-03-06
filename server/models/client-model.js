import { DataTypes } from 'sequelize';
import sequelize from '../config/db-connection.js';

const Client = sequelize.define('Client', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: { msg: 'Client name cannot be empty' } },
    },
    caseType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'case_type',
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Active',
    },
    dateAdded: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: 'date_added',
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'clients_registry',
    timestamps: true,
    underscored: true,
});

export default Client;
