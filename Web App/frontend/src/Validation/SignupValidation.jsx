function Validation(values) {
  let error = {}; //This is error object
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  /*
    To check a password between 8 to 15 characters which contain at least one lowercase letter, 
    one uppercase letter, one numeric digit, and one special character
    */
  const mobile_pattern = /^[0-9]{10}$/; // Assuming a 10-digit mobile number format
  const univregno_pattern = /^[0-9]{4}\/[A-Z]{3}\/[0-9]{3}$/; // University registration number pattern

  if (values.username === "") {
    error.username = "Username should not be empty";
  } else if (values.username.length < 5) {
    error.username = "Username should be at least 5 characters";
  } else {
    error.username = "";
  }

  if (values.email === "") {
    error.email = "Email should not be empty";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email Didn't match";
  } else {
    error.email = "";
  }

  if (values.univregno === "") {
    error.univregno = "University registration number should not be empty";
  } else if (!univregno_pattern.test(values.univregno)) {
    error.univregno = "Invalid university registration number format";
  } else {
    error.univregno = "";
  }

  if (values.mobile === "") {
    error.mobile = "Mobile number should not be empty";
  } else if (!mobile_pattern.test(values.mobile)) {
    error.mobile = "Mobile number format is invalid";
  } else {
    error.mobile = "";
  }

  if (values.password === "") {
    error.password = "Password should not be empty";
  } else if (values.password.length < 8) {
    error.password = "Password should be between 8 to 15 characters";
  } else if (!password_pattern.test(values.password)) {
    error.password = "Password didn't match";
  } else {
    error.password = "";
  }

  if (
    values.cpassword === "" ||
    String(values.cpassword) !== String(values.password)
  ) {
    //console.log(values.password + "__" + values.cpassword); //This is for testing purpose
    error.cpassword = "Password mismatch";
  } else {
    error.cpassword = "";
  }
  console.log("Form validation : "+ error);
  return error;
}

export default Validation;