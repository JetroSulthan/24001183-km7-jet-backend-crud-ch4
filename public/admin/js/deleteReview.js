document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".delete-review").forEach(function (button) {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            var reviewId = this.getAttribute("data-id");

            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger",
                },
                buttonsStyling: false,
            });

            swalWithBootstrapButtons.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
                didRender: () => {
                    document.querySelector(".swal2-confirm").style.marginLeft = "0.5rem";
                    document.querySelector(".swal2-cancel").style.marginRight = "0.5rem";
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch("/dashboard/reviews/delete/" + reviewId, {
                        method: "GET",
                    })
                        .then((response) => {
                            if (response.ok) {
                                swalWithBootstrapButtons.fire({
                                    title: "Deleted!",
                                    text: "Your review has been deleted.",
                                    icon: "success",
                                }).then(() => {
                                    location.reload();
                                });
                            } else {
                                swalWithBootstrapButtons.fire({
                                    title: "Error!",
                                    text: "Failed to delete review.",
                                    icon: "error",
                                });
                            }
                        })
                        .catch((error) => {
                            swalWithBootstrapButtons.fire({
                                title: "Error!",
                                text: "Something went wrong. Please try again.",
                                icon: "error",
                            });
                        });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelled",
                        text: "Your review is safe :)",
                        icon: "error",
                    });
                }
            });
        });
    });
});
