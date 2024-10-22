document
  .getElementById("editUserForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "User updated successfully!",
          text: "The user information has been successfully updated.",
        }).then(() => {
          window.location.href = "/dashboard/users";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Update failed",
          text: "There was a problem updating the user information.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server error",
        text: "Something went wrong with the server.",
      });
    }
  });
