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
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    caseType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'case_type',
    },
    caseDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'case_description',
    },
    incidentDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'incident_date',
    },
    opposingParty: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'opposing_party',
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
