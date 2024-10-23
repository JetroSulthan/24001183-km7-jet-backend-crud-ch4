'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Rentals', [
      {
        tgl_peminjaman: new Date('2024-10-01'),
        tgl_pengembalian: new Date('2024-10-05'),
        total_harga: 150000,
        status: 'selesai',
        user_id: 1,
        car_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tgl_peminjaman: new Date('2024-10-02'),
        tgl_pengembalian: new Date('2024-10-06'),
        total_harga: 200000,
        status: 'selesai',
        user_id: 2,
        car_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tgl_peminjaman: new Date('2024-10-03'),
        tgl_pengembalian: new Date('2024-10-08'),
        total_harga: 250000,
        status: 'aktif',
        user_id: 3,
        car_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tgl_peminjaman: new Date('2024-10-04'),
        tgl_pengembalian: new Date('2024-10-09'),
        total_harga: 300000,
        status: 'canceled',
        user_id: 1,
        car_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        tgl_peminjaman: new Date('2024-10-05'),
        tgl_pengembalian: new Date('2024-10-10'),
        total_harga: 180000,
        status: 'selesai',
        user_id: 2,
        car_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cars', null, {});
  }
};
