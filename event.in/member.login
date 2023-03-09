<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Member Registration</title>
    <style>
      label {
        display: block;
        margin-bottom: 10px;
      }
      input[type="submit"] {
        margin-top: 20px;
      }
      .error {
        color: red;
        font-size: 14px;
        margin-bottom: 10px;
      }
    </style>
  </head>
  <body>
    <h1>Member Registration</h1>
    <form id="registrationForm">
      <label>
        Full Name:
        <input type="text" name="fullName" required>
      </label>
      <label>
        Email:
        <input type="email" name="email" required>
      </label>
      <label>
        Password:
        <input type="password" name="password" required>
      </label>
      <input type="submit" value="Register">
    </form>

    <div id="successMessage" style="display: none;">
      <p>Thank you for registering as a member!</p>
      <p>Please check your email for a verification link to complete your registration.</p>
    </div>

    <div id="errorMessage" style="display: none;">
      <p>Sorry, something went wrong while processing your registration. Please try again later.</p>
    </div>

    <script>
      const form = document.getElementById("registrationForm");
      const successMessage = document.getElementById("successMessage");
      const errorMessage = document.getElementById("errorMessage");

      form.addEventListener("submit", event => {
        event.preventDefault();

        // Gather form data
        const formData = new FormData(form);

        // Send form data to server for registration
        fetch("/register", {
          method: "POST",
          body: formData
        })
          .then(response => {
            if (response.ok) {
              form.style.display = "none";
              successMessage.style.display = "block";
            } else {
              throw new Error("Failed to register as a member.");
            }
          })
          .catch(error => {
            console.error(error);
            form.style.display = "none";
            errorMessage.style.display = "block";
          });
      });
    </script>
  </body>
</html>
