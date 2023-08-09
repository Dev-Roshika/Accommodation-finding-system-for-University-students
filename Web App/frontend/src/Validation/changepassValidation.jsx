function Validation(values) {
    let error = {}; //This is error object
    const password_pattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    /*
      To check a password between 8 to 15 characters which contain at least one lowercase letter, 
      one uppercase letter, one numeric digit, and one special character
      */
    
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