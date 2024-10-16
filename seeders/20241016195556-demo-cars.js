'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Cars', [
      {
        model: 'Toyota Avanza',
        tahun: 2020,
        no_plat: 'B 1234 ABC',
        status: 'tersedia',
        harga: 300000,
        foto_mobil: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        model: 'Honda Jazz',
        tahun: 2021,
        no_plat: 'B 2345 DEF',
        status: 'tersedia',
        harga: 350000,
        foto_mobil: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        model: 'Suzuki Ertiga',
        tahun: 2022,
        no_plat: 'B 3456 GHI',
        status: 'tersedia',
        harga: 400000,
        foto_mobil: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        model: 'Daihatsu Xenia',
        tahun: 2023,
        no_plat: 'B 4567 JKL',
        status: 'tidak tersedia',
        harga: 320000,
        foto_mobil: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        model: 'Nissan Grand Livina',
        tahun: 2019,
        no_plat: 'B 5678 MNO',
        status: 'tidak tersedia',
        harga: 280000,
        foto_mobil: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cars', null, {});
  }
};
