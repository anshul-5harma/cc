$(function () {
  $("#g2-form").on("click", function (event) {
    event.preventDefault();

    const userData = {
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      licenseNumber: $("#licenseNumber").val(),
      age: $("#age").val(),
      dob: $("#dob").val(),
      carMake: $("#carMake").val(),
      carModel: $("#carModel").val(),
      carYear: $("#carYear").val(),
      plateNumber: $("#plateNumber").val(),
    };

    // Simple data validation checks
    function isNonEmptyString(value) {
      return typeof value === "string" && value.length > 0;
    }

    function isNumeric(value) {
      return !isNaN(value) && value.trim() !== "";
    }

    function isValidYear(value) {
      const year = parseInt(value, 10);
      return isNumeric(value) && year >= 1886 && year <= new Date().getFullYear();
    }

    function displayError(field, message) {
      $(`#${field}_error`).text(message);
    }

    function clearErrors() {
      $(".error-message").text("");
    }

    // Clear previous errors
    clearErrors();

    const errors = [];

    if (!isNonEmptyString(userData.firstName)) {
      errors.push({ field: "firstName", message: "First name is required." });
    }

    if (!isNonEmptyString(userData.lastName)) {
      errors.push({ field: "lastName", message: "Last name is required." });
    }

    if (!isNonEmptyString(userData.licenseNumber) || userData.licenseNumber.length < 13) {
      errors.push({
        field: "licenseNumber",
        message: "License number is required and must be 13 characters.",
      });
    }

    if (!isNumeric(userData.age) || userData.age < 18 || userData.age > 100) {
      errors.push({ field: "age", message: "Age must be a number between 18 and 100." });
    }

    if (!isNonEmptyString(userData.dob)) {
      errors.push({ field: "dob", message: "Date of birth is required." });
    }

    if (!isNonEmptyString(userData.carMake)) {
      errors.push({ field: "carMake", message: "Car make is required." });
    }

    if (!isNonEmptyString(userData.carModel)) {
      errors.push({ field: "carModel", message: "Car model is required." });
    }

    if (!isValidYear(userData.carYear)) {
      errors.push({
        field: "carYear",
        message: "Car year must be a valid 4-digit year between 1886 and the current year.",
      });
    }

    if (!isNonEmptyString(userData.plateNumber)) {
      errors.push({ field: "plateNumber", message: "Plate number is required." });
    }

    // Display errors
    errors.forEach((error) => {
      displayError(error.field, error.message);
      window.scrollTo(0, 0);
    });

    if (errors.length === 0) {
      console.log("All data is valid:", userData);

      axios
        .post("/save-user", userData)
        .then(function (response) {
          alert(response.data.message);
          window.location.href = "/class-g2";
          console.log("response.data", response.data.message);
        })
        .catch(function (error) {
          console.log("response.data", error.response.data);

          alert("Error: " + error.response.data);
        });
    }
  });
});
