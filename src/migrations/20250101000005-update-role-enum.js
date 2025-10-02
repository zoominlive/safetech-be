'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // PostgreSQL: Add CHECK constraint to validate role values
    // The role field is already VARCHAR(50) from create-user migration
    await queryInterface.sequelize.query(
      `ALTER TABLE users ADD CONSTRAINT users_role_check CHECK (role IN ('Admin', 'Technician', 'Project Manager'))`
    );
  },

  async down(queryInterface, Sequelize) {
    // Remove the check constraint
    await queryInterface.sequelize.query(
      `ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check`
    );
  }
};
