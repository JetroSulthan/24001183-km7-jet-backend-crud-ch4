document
  .getElementById("registrationForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const response = await fetch(this.action, {
      method: this.method,
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "User Created!",
        text: result.message,
      }).then(() => {
        window.location.href = "/dashboard/users";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result.message,
      });
    }
  });
