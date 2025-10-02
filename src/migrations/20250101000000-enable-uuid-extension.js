'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Enable pgcrypto extension for UUID generation in PostgreSQL
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
  },

  async down(queryInterface, Sequelize) {
    // Drop the extension if needed (usually safe to keep)
    await queryInterface.sequelize.query('DROP EXTENSION IF EXISTS "pgcrypto";');
  }
};

