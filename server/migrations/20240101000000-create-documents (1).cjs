'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('documents', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      clientName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      caseType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      version: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filePath: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      originalFileName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fileSize: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      mimeType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Unique constraint: one version per clientName + caseType combination
    await queryInterface.addIndex('documents', ['clientName', 'caseType', 'version'], {
      unique: true,
      name: 'unique_client_case_version',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('documents');
  },
};
