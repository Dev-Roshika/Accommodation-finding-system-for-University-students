function Validation(values){
    let error = {} //This is error object
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
    /*
    To check a password between 8 to 15 characters which contain at least one lowercase letter, 
    one uppercase letter, one numeric digit, and one special character
    */
    if(values.email === ""){
        error.email = "Name should not be empty"
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Email Didn't match"
    } else{
        error.email = ""
    }

    if(values.password === ""){
        error.password = "Password should not be empty"
    } else if(!password_pattern.test(values.password)){
        error.password = "Password didn't match"
    } else{
        error.password = ""
    }
    return error;
}

export default Validation;