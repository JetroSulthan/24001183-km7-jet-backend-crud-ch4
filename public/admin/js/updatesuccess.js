document
  .getElementById("editUserForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const userName = form.name.value;
    const formData = new FormData(form);

    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: `Anda ingin memperbarui informasi pengguna: ${userName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, perbarui!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Pengguna berhasil diperbarui!",
            text: "Informasi pengguna telah berhasil diperbarui.",
          }).then(() => {
            window.location.href = "/dashboard/users";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Pembaharuan gagal",
            text: "Ada masalah dalam memperbarui informasi pengguna.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Kesalahan server",
          text: "Terjadi kesalahan pada server.",
        });
      }
    }
  });
