document
  .querySelector(".needs-validation")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const form = document.querySelector(".needs-validation");
    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Your account has been created successfully!",
          }).then(() => {
            form.reset();
            const errorMessages = form.querySelectorAll(".invalid-feedback");
            errorMessages.forEach((msg) => (msg.style.display = "none"));

            window.location.href = "/dashboard/users";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "There was a problem creating your account. Please try again.",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something went wrong. Please try again.",
        });
      });
  });
