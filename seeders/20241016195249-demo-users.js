'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'AdminUser',
        email: 'admin@example.com',
        password: 'bismillah',
        phone: '1234567890',
        alamat: '123 Admin Street',
        role: 'admin',
        foto_profil: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'CustomerUser1',
        email: 'customer1@example.com',
        password: 'bismillah',
        phone: '0987654321',
        alamat: '456 Customer Lane',
        role: 'customer',
        foto_profil: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'CustomerUser2',
        email: 'customer2@example.com',
        password: 'bismillah',
        phone: '1122334455',
        alamat: '789 Customer Avenue',
        role: 'customer',
        foto_profil: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
