import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../Validation/SignupValidation";
import axios from "axios";
import RequiredField from "../Components/RequiredField";
import { useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Signup() {
    const [values, setValues] = useState({
        fullname: "",
        username: "",
        mobile: "",
        email: "",
        nidno: "",
        paddress: "",
        password: "",
        cpassword: "",
    });
    const [email, setEmail] = useState("");
    const [emailExists, setEmailExists] = useState(false);
    const [username, setUsername] = useState("");
    const [usernameExists, setUsernameExists] = useState(false);
    const [errors, setErrors] = useState({});
    const [file, setFile] = useState();
    const [profilefile, setProfilefile] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const navigate = useNavigate();
    const handleFile = (event) => {
        const nidphoto = event.target.files[0];
        setFile(nidphoto);
    };
    const handleProfileImageFile = (event) => {
        const profileimage = event.target.files[0];
        setProfilefile(profileimage);
    };
    const handleInput = (event) => {
        setErrors((prev) => ({
            ...prev,
            [event.target.name]: "",
        }));
        setValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
        if (event.target.name === "email") {
            setEmail(event.target.value);
        }
        if (event.target.name === "username") {
            setUsername(event.target.value);
        }
    };
    useEffect(() => {
        if (email) {
            axios
                .get("http://localhost:8081/owner/check-email", {
                    params: { email: email },
                })
                .then((res) => {
                    setEmailExists(false);
                    if (res.data.result === "EmailExists") {
                        setEmailExists(true);
                        console.log("Email exists");
                    } else if (res.data.result === "EmailDoesNotExists") {
                        console.log("Email does not exist");
                    } else {
                        console.log("Error occurred");
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [email]);
    useEffect(() => {
        if (username) {
            axios
                .get("http://localhost:8081/owner/check-username", {
                    params: { username: username },
                })
                .then((res) => {
                    setUsernameExists(false);
                    if (res.data.result === "UsernameExists") {
                        setUsernameExists(true);
                        console.log(
                            "Someone already has that username. Try another?"
                        );
                    } else if (res.data.result === "UsernameDoesNotExists") {
                        console.log("Username does not exist");
                    } else {
                        console.log("Error occurred");
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [username]);
    useEffect(() => {
        axios
            .get("http://localhost:8081")
            .then((res) => {
                if (res.data.Valid && res.data.role === "owner") {
                    navigate("/home");
                } else {
                    console.log("User is not logged in");
                }
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        if (emailExists) {
            setErrors((prev) => ({
                ...prev,
                email: "Email already exists",
            }));
        }
    }, [emailExists]);
    useEffect(() => {
        if (usernameExists) {
            setErrors((prev) => ({
                ...prev,
                username: "Someone already has that username. Try another?",
            }));
        }
    }, [usernameExists]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        console.log(validationErrors.password);
        // Check if there are any validation errors
        if (
            validationErrors.cpassword !== "" ||
            validationErrors.password !== "" ||
            validationErrors.username !== "" ||
            validationErrors.mobile !== "" ||
            validationErrors.email !== ""
        ) {
            return; // Stop further execution of the handleSubmit function
        }

        const formData = new FormData();
        formData.append("fullname", values.fullname);
        formData.append("username", values.username);
        formData.append("mobile", values.mobile);
        formData.append("nidno", values.nidno);
        formData.append("nidphoto", file);
        formData.append("profileimage", profilefile);
        formData.append("email", values.email);
        formData.append("paddress", values.paddress);
        formData.append("password", values.password);
        formData.append("cpassword", values.cpassword);
        console.log(errors);
        if (emailExists) {
            alert("Email already exists");
        }
        if (usernameExists) {
            alert("Someone already has that username. Try another?");
        }
        console.log("cheking errors");
        console.log("errors : " + errors);
        console.log("errors.cpassword : " + errors.cpassword);
        console.log("emailExists : " + emailExists);
        console.log("usernameExists : " + usernameExists);
        console.log("errors.username : " + errors.username);
        console.log("errors.mobile : " + errors.mobile);
        // if (
        //     errors.cpassword === "" &&
        //     emailExists === false &&
        //     usernameExists === false &&
        //     errors.username === "" &&
        //     errors.mobile === "" &&
        //     errors.email === ""
        // ) {
        if (emailExists === false && usernameExists === false) {
            console.log("No error");
            console.log("errors.email : " + errors.email);
            console.log(formData);
            axios
                .post("http://localhost:8081/owner/signup", formData)
                .then((res) => {
                    if (res.data.Status === "Success") {
                        navigate("/owner/login");
                    } else {
                        alert("Error and not success");
                    }
                })
                .catch((err) => console.log(err));
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleCPasswordVisibility = () => {
        setShowCPassword(!showCPassword);
    };
    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{
                marginTop: "200px",
                marginBottom: "200px",
            }}
        >
            <div
                className="bg-secondary bg-gradient rounded shadow-sm bg-opacity-10"
                style={{ width: "50%" }}
            >
                <form action="" onSubmit={handleSubmit}>
                    <div
                        className="d-flex justify-content-center flex-column bg-secondary bg-gradient p-5 bg-opacity-50"
                        style={{
                            borderTopLeftRadius: "0.5rem",
                            borderTopRightRadius: "0.5rem",
                            borderBottom: "none",
                        }}
                    >
                        <h1
                            className="text-center text-white"
                            style={{ fontWeight: "bold" }}
                        >
                            Owner Signup
                        </h1>
                        <h5 className="text-center text-secondary">
                            Fill out form to get started
                        </h5>
                    </div>
                    <div className="p-5">
                    {/* FullName */}
                    <div className="mb-3">
                        <label htmlFor="fullname">
                            <strong style={{ color: "#0d987d" }}>
                                Full Name
                                <RequiredField />
                            </strong>
                        </label>
                        <input
                            name="fullname"
                            type="text"
                            required
                            className="form-control rounded-0"
                            onChange={handleInput}
                        />
                        {errors.fullname && (
                            <span className="text-danger">
                                {errors.fullname}
                            </span>
                        )}
                    </div>
                        <div className="mb-3">
                            <div className="row">
                                {/* User Name */}
                                <div className="col-sm">
                                    <label htmlFor="username">
                                        <strong style={{ color: "#0d987d" }}>
                                            User Name
                                            <RequiredField />
                                        </strong>
                                    </label>
                                    <input
                                        name="username"
                                        type="text"
                                        required
                                        className="form-control rounded-0"
                                        onChange={handleInput}
                                    />
                                    {errors.username && (
                                        <span className="text-danger">
                                            {errors.username}
                                        </span>
                                    )}
                                </div>
                                {/* Contact No */}
                                <div className="col-sm">
                                    <label htmlFor="mobile">
                                        <strong style={{ color: "#0d987d" }}>
                                            Contact Number
                                            <RequiredField />
                                        </strong>
                                    </label>
                                    <input
                                        name="mobile"
                                        type="text"
                                        required
                                        className="form-control rounded-0"
                                        placeholder="01XXXXXXXX"
                                        onChange={handleInput}
                                    />
                                    {errors.mobile && (
                                        <span className="text-danger">
                                            {errors.mobile}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Email */}
                        <div className="mb-3">
                            <label htmlFor="email">
                                <strong style={{ color: "#0d987d" }}>Email</strong>
                            </label>
                            <input
                                name="email"
                                type="email"
                                className="form-control rounded-0"
                                required
                                onChange={handleInput}
                            />
                            {errors.email && (
                                <span className="text-danger">
                                    {errors.email}
                                </span>
                            )}
                        </div>
                        {/* Profile Image */}
                        <div className="mb-3">
                            <label htmlFor="profileimage">
                                <strong style={{ color: "#0d987d" }}>
                                    Profile Image
                                    <RequiredField />
                                </strong>
                            </label>
                            <input
                                name="profileimage"
                                type="file"
                                required
                                className="form-control rounded-0"
                                accept="image/png, image/jpeg , image/jpg "
                                onChange={handleProfileImageFile}
                            />
                            {errors.profileimage && (
                                <span className="text-danger">
                                    {errors.profileimage}
                                </span>
                            )}
                        </div>
                        {/* NID */}
                        <div className="mb-3">
                            <label htmlFor="nidno">
                                <strong style={{ color: "#0d987d" }}>
                                    NID No
                                    <RequiredField />
                                </strong>
                            </label>
                            <input
                                name="nidno"
                                type="text"
                                required
                                className="form-control rounded-0"
                                onChange={handleInput}
                            />
                            {errors.nidno && (
                                <span className="text-danger">
                                    {errors.nidno}
                                </span>
                            )}
                        </div>
                        {/* NID Photo */}
                        <div className="mb-3">
                            <label htmlFor="nidphoto">
                                <strong style={{ color: "#0d987d" }}>
                                    NID Photo
                                    <RequiredField />
                                </strong>
                            </label>
                            <input
                                name="nidphoto"
                                type="file"
                                required
                                className="form-control rounded-0"
                                accept="image/png, image/jpeg , image/jpg "
                                onChange={handleFile}
                            />
                            {errors.nidphoto && (
                                <span className="text-danger">
                                    {errors.nidphoto}
                                </span>
                            )}
                        </div>
                        <div className="mb-3">
                            {/* Private address */}
                            <div className="col-sm">
                                <label htmlFor="paddress">
                                    <strong style={{ color: "#0d987d" }}>
                                        Private address
                                        <RequiredField />
                                    </strong>
                                </label>
                                <input
                                    name="paddress"
                                    type="text"
                                    required
                                    className="form-control rounded-0"
                                    onChange={handleInput}
                                />
                                {errors.paddress && (
                                    <span className="text-danger">
                                        {errors.paddress}
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* <div className="mb-3">
                            <div className="row">
                                <div className="col-sm">
                                    <label htmlFor="password">
                                        <strong>
                                            Password
                                            <RequiredField />
                                        </strong>
                                    </label>
                                    <input
                                        name="password"
                                        type="password"
                                        title="password should be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
                                        required
                                        className="form-control rounded-0"
                                        onChange={handleInput}
                                    />
                                    {errors.password && (
                                        <span className="text-danger">
                                            {errors.password}
                                        </span>
                                    )}
                                </div>
                                <div className="col-sm">
                                    <label htmlFor="cpassword">
                                        <strong>
                                            Confirm password
                                            <RequiredField />
                                        </strong>
                                    </label>
                                    <input
                                        name="cpassword"
                                        type="password"
                                        required
                                        className="form-control rounded-0"
                                        onChange={handleInput}
                                    />
                                    {errors.cpassword && (
                                        <span className="text-danger">
                                            {errors.cpassword}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div> */}
                        
                            <div className="row">
                                {/* Password */}
                                <div className="col-sm position-relative">
                                    <label htmlFor="password">
                                        <strong style={{ color: "#0d987d" }}>
                                            Password
                                            <RequiredField />
                                        </strong>
                                    </label>
                                    <div className="input-group">
                                        <input
                                            name="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            title="password should be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
                                            required
                                            className="form-control rounded-0"
                                            onChange={handleInput}
                                        />
                                        <div className="input-group-append">
                                            <button
                                                type="button"
                                                className="btn btn-link btn-password-toggle"
                                                onClick={
                                                    togglePasswordVisibility
                                                }
                                                style={{
                                                    backgroundColor: "#0d987d",
                                                    borderTopRightRadius:
                                                        "0.2rem",
                                                    borderBottomRightRadius:
                                                        "0.2rem",
                                                    borderTopLeftRadius: "0",
                                                    borderBottomLeftRadius: "0",
                                                    border: "none",
                                                    paddingLeft: "10px",
                                                    paddingRight: "10px",
                                                }}
                                            >
                                                {showPassword ? (
                                                    <FiEyeOff color="#fff" />
                                                ) : (
                                                    <FiEye color="#fff" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    {errors.password && (
                                        <span className="text-danger">
                                            {errors.password}
                                        </span>
                                    )}
                                </div>
                                {/* Confirm password */}
                                <div className="col-sm possion-relative">
                                    <label htmlFor="cpassword">
                                        <strong style={{ color: "#0d987d" }}>
                                            Confirm password
                                            <RequiredField />
                                        </strong>
                                    </label>
                                    <div className="input-group">
                                        <input
                                            name="cpassword"
                                            type={
                                                showCPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            required
                                            className="form-control rounded-0"
                                            onChange={handleInput}
                                        />
                                        <div className="input-group-append">
                                            <button
                                                type="button"
                                                className="btn btn-link btn-password-toggle"
                                                onClick={
                                                    toggleCPasswordVisibility
                                                }
                                                style={{
                                                    backgroundColor: "#0d987d",
                                                    borderTopRightRadius:
                                                        "0.2rem",
                                                    borderBottomRightRadius:
                                                        "0.2rem",
                                                    borderTopLeftRadius: "0",
                                                    borderBottomLeftRadius: "0",
                                                    border: "none",
                                                    paddingLeft: "10px",
                                                    paddingRight: "10px",
                                                }}
                                            >
                                                {showCPassword ? (
                                                    <FiEyeOff color="#fff" />
                                                ) : (
                                                    <FiEye color="#fff" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    {errors.cpassword && (
                                        <span className="text-danger">
                                            {errors.cpassword}
                                        </span>
                                    )}
                                </div>
                            </div>
                        <button
                            type="submit"
                            className="btn btn-success w-100 rounded-0 mt-3"
                            style={{
                                backgroundColor: "#0d987d",
                                border: "none",
                            }}
                        >
                            <strong>Signup</strong>
                        </button>
                        <div className="d-flex justify-content-center align-item-center mt-3">
                            <p className="text-secondary">
                                Already have an account?
                            </p>
                        </div>
                        <Link
                            to="/owner/login"
                            className="btn btn-default border w-100 bg-light rounded-0 mb-3"
                            style={{ color: "#0d987d" }}
                        >
                            <strong>Signin</strong>
                        </Link>
                    </div>
                </form>
                <div
                    className="d-flex justify-content-center bg-secondary bg-gradient p-2"
                    style={{
                        borderBottomLeftRadius: "0.5rem",
                        borderBottomRightRadius: "0.5rem",
                        borderTop: "none",
                    }}
                >
                    <span className="text-white">© 2023 Copyright:</span>&nbsp;
                    <span
                        className="text-white"
                        onClick={() => (window.location.href = "/")}
                        style={{ cursor: "pointer", fontWeight: "bold" }}
                        title="Go Back"
                    >
                        {" "}
                        UniAccomodations{" "}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Signup;
