import { DataTypes } from 'sequelize';
import sequelize from '../config/db-connection.js';

const Document = sequelize.define(
  'Document',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'client_name',
      validate: {
        notEmpty: { msg: 'clientName cannot be empty' },
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'version cannot be empty' },
      },
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'file_name',
    },
    fileCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'file_count',
      defaultValue: 0,
    },
  },
  {
    tableName: 'documents',
    timestamps: true,
    underscored: true,
  }
);

export default Document;