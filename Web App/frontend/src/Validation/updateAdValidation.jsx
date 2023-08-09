function Validation(values) {
    let error = {}; //This is error object
    const mobile_pattern = /^[0-9]{10}$/; // Assuming a 10-digit mobile number format

    if (values.ContactNo === "") {
        error.ContactNo = "Mobile number should not be empty";
      } else if (!mobile_pattern.test(values.ContactNo)) {
        error.ContactNo = "Mobile number format is invalid";
      } else {
        error.ContactNo = "";
      }
  
    console.log("Form validation : "+ error);
    return error;
  }
  
  export default Validation;
  