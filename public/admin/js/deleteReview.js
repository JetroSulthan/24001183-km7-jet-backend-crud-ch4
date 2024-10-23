document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".delete-review").forEach(function (button) {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            var reviewId = this.getAttribute("data-id");

            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger",
                },
                buttonsStyling: false,
            }).then((result) => {
                const confirmButton = document.querySelector('.swal2-confirm');
                const cancelButton = document.querySelector('.swal2-cancel');

                if (confirmButton) {
                    confirmButton.style.marginRight = "10px";
                }
                if (cancelButton) {
                    cancelButton.style.marginLeft = "10px";
                }

                if (result.isConfirmed) {
                    fetch("/dashboard/reviews/delete/" + reviewId, {
                        method: "GET",
                    })
                        .then((response) => {
                            if (response.ok) {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your review has been deleted.",
                                    icon: "success",
                                }).then(() => {
                                    location.reload();
                                });
                            } else {
                                Swal.fire({
                                    title: "Error!",
                                    text: "Failed to delete review.",
                                    icon: "error",
                                });
                            }
                        })
                        .catch((error) => {
                            Swal.fire({
                                title: "Error!",
                                text: "Something went wrong. Please try again.",
                                icon: "error",
                            });
                        });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire({
                        title: "Cancelled",
                        text: "Your review is safe :)",
                        icon: "error",
                    });
                }
            });
        });
    });
});
