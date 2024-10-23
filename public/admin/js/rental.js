function confirmDelete(rentalId) {
    Swal.fire({
        title: 'Apakah anda yakin?',
        text: "Aksi ini tidak dapat dikembalikan!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            // Redirect to the delete URL if confirmed
            window.location.href = `/dashboard/rentals/delete/${rentalId}`;
        }
    })
}