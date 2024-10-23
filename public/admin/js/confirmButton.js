const confirmCreate = () => {
  Swal.fire({
    title: "Apakah Anda yakin?",
    text: "Anda akan menambah pengguna baru!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, buat pengguna!",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/dashboard/users/create";
    }
  });
};

const confirmDelete = (userId, userName) => {
  swal
    .fire({
      title: "Apakah Anda yakin?",
      text: `Anda akan menghapus pengguna dengan nama: ${userName}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus pengguna!",
      cancelButtonText: "Batal",
    })
    .then((result) => {
      if (result.isConfirmed) {
        window.location.href = `/dashboard/users/delete/${userId}`;
      }
    });
};
