import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/postAd.css";
import Validation from "../Validation/postAdValidation";

function PostAd() {
    const [values, setValues] = useState({
        title: "",
        description: "",
        price: "",
        address: "",
        distance: "",
        distanceUnit: "",
        boys: "",
        girls: "",
        facilities: "",
        rules: "",
        contactno: "",
        verified:"no",
    });
    const [errors, setErrors] = useState({});
    const [isChecked, setIsChecked] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [numberOfPersons, setNumberOfPersons] = useState("");
    const [selectedUnit, setSelectedUnit] = useState("");
    const [file, setFile] = useState();
    //const [distanceUnit, setDistanceUnit] = useState("");

    const handleUnitChange = (event) => {
        const selectedUnit = event.target.value;
        setSelectedUnit(selectedUnit);

        if (selectedUnit === "meter") {
            setValues((prev) => ({
                ...prev,
                distanceUnit: "m",
            }));
        } else if (selectedUnit === "kilometer") {
            setValues((prev) => ({
                ...prev,
                distanceUnit: "km",
            }));
        }
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setNumberOfPersons("");
    };

    const handleNumberOfPersonsChange = (event) => {
        const selectedValue = event.target.value;
        setNumberOfPersons(selectedValue);

        if (selectedOption === "boys") {
            setValues((prev) => ({
                ...prev,
                boys: selectedValue,
            }));
        } else if (selectedOption === "girls") {
            setValues((prev) => ({
                ...prev,
                girls: selectedValue,
            }));
        }
    };

    const navigate = useNavigate();

    const handleInput = (event) => {
        setErrors((prev) => ({
            ...prev,
            [event.target.name]: "",
        }));
        setValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleFile = (event) => {
        //console.log(event.target.files[0])
        setFile(event.target.files[0]);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);
        if (validationErrors.contactno !== "") {
            return; // Stop further execution of the handleSubmit function
        }
        var negotiable_or_not = "";
        if (isChecked) {
            negotiable_or_not = "Yes";
        } else {
            negotiable_or_not = "No";
        }
        const formData = new FormData();
        formData.append("coverimage", file);
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("negotiable", negotiable_or_not);
        formData.append("address", values.address);
        formData.append("distance", values.distance);
        formData.append("distanceUnit", values.distanceUnit);
        formData.append("boys", values.boys);
        formData.append("girls", values.girls);
        formData.append("facilities", values.facilities);
        formData.append("rules", values.rules);
        formData.append("contactno", values.contactno);
        formData.append("verified", values.verified);
        axios
            .post("http://localhost:8081/owner/post-ad", formData)
            .then((res) => {
                if (res.data.Status === "Success") {
                    const RowId = res.data.RowId;
                    console.log(res.data);
                    navigate("/owner/post-ad/success/" + RowId);
                } else {
                    alert("Error");
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                marginTop: "100px",
                marginBottom: "100px",
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
                            Post Ad for Boarding Houses
                        </h1>
                        <h5 className="text-center text-secondary">
                            Edit form to get started
                        </h5>
                    </div>
                    <div className="p-5">
                        <div className="mb-3">
                            <label htmlFor="title">
                                <strong style={{ color: "#0d987d" }}>
                                    Title
                                </strong>
                            </label>
                            <input
                                type="text"
                                name="title"
                                required
                                onChange={handleInput}
                                placeholder={"e.g. Name of the boarding place"}
                                className="form-control rounded-0"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description">
                                <strong style={{ color: "#0d987d" }}>
                                    Description
                                </strong>
                            </label>
                            <textarea
                                type="text"
                                name="description"
                                required
                                onChange={handleInput}
                                className="form-control rounded-0"
                                rows={4} // Specify the number of visible rows for the textarea
                            ></textarea>{" "}
                        </div>
                        <div className="mb-3 row">
                            <div className="col-sm">
                                <label htmlFor="persons">
                                    <strong style={{ color: "#0d987d" }}>
                                        Select Boys or Girls
                                    </strong>
                                </label>
                                <select
                                    name="persons"
                                    value={selectedOption}
                                    required
                                    onChange={handleOptionChange}
                                    className={"form-select rounded-0"}
                                    style={{
                                        background: selectedOption
                                            ? "rgba(13, 152, 125, 0.5)"
                                            : "",

                                        fontWeight: selectedOption
                                            ? "bold"
                                            : "",
                                        color: selectedOption
                                            ? "white"
                                            : "black",
                                    }}
                                >
                                    <option value="">Select...</option>
                                    <option value="boys">Boys</option>
                                    <option value="girls">Girls</option>
                                </select>
                            </div>
                            <div className="col-sm">
                                {selectedOption ? (
                                    <>
                                        <label htmlFor="numberOfPersons">
                                            <strong
                                                style={{ color: "#0d987d" }}
                                            >
                                                Number of {selectedOption}
                                            </strong>
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="number"
                                                name="numberOfPersons"
                                                required
                                                value={numberOfPersons}
                                                onChange={
                                                    handleNumberOfPersonsChange
                                                }
                                                className="form-control rounded-0"
                                                min="1"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <input type="hidden" />
                                )}
                            </div>
                        </div>

                        <div className="mb-3 custom-checkbox-container">
                            <label htmlFor="nagotiable">
                                <strong style={{ color: "#0d987d" }}>
                                    Negotiable
                                </strong>
                            </label>
                            <input
                                type="checkbox"
                                name="nagotiable"
                                checked={isChecked}
                                onChange={() => setIsChecked((prev) => !prev)}
                                className={`form-check-input custom-checkbox rounded-0 ${
                                    isChecked ? "checked" : ""
                                }`}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price">
                                <strong style={{ color: "#0d987d" }}>
                                    Price
                                </strong>
                            </label>
                            <input
                                type="number"
                                name="price"
                                required
                                onChange={handleInput}
                                placeholder="Rs."
                                className="form-control rounded-0"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address">
                                <strong style={{ color: "#0d987d" }}>
                                    Address
                                </strong>
                            </label>
                            <textarea
                                type="text"
                                name="address"
                                required
                                onChange={handleInput}
                                className="form-control rounded-0"
                                rows={4}
                            ></textarea>{" "}
                        </div>
                        <div className="d-flex mb-3">
                            <div className="col-sm">
                                <label htmlFor="distance">
                                    <strong style={{ color: "#0d987d" }}>
                                        Distance
                                    </strong>
                                </label>
                                <input
                                    type="number"
                                    name="distance"
                                    required
                                    onChange={handleInput}
                                    min="0"
                                    placeholder="Distance from UoJ main premises"
                                    className="form-control rounded-0"
                                />
                            </div>
                            <div className="col-sm ms-2">
                                <label htmlFor="distanceUnit">
                                    <strong style={{ color: "#0d987d" }}>
                                        Unit
                                    </strong>
                                </label>
                                <select
                                    name="distanceUnit"
                                    value={selectedUnit}
                                    required
                                    onChange={handleUnitChange}
                                    className="form-select rounded-0"
                                    style={{
                                        background: selectedUnit
                                            ? "rgba(13, 152, 125, 0.5)"
                                            : "",

                                        fontWeight: selectedUnit ? "bold" : "",
                                        color: selectedUnit ? "white" : "black",
                                    }}
                                >
                                    <option value="">Select...</option>
                                    <option value="meter">Meter</option>
                                    <option value="kilometer">Kilometer</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="facilities">
                                <strong style={{ color: "#0d987d" }}>
                                    Facilities
                                </strong>
                            </label>
                            <textarea
                                type="text"
                                name="facilities"
                                required
                                placeholder="e.g. 4 generous bedrooms ,1 Separate toilet/bathroom, 4 bedrooms"
                                onChange={handleInput}
                                className="form-control rounded-0"
                                rows={4}
                            ></textarea>{" "}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="rules">
                                <strong style={{ color: "#0d987d" }}>
                                    Rules
                                </strong>
                            </label>
                            <textarea
                                type="text"
                                name="rules"
                                required
                                placeholder="e.g. No smoking, No alcohol, No pets, No outsiders allowed"
                                onChange={handleInput}
                                className="form-control rounded-0"
                                rows={4}
                            ></textarea>{" "}
                        </div>
                        <div className="mb-3 row">
                            <div className="col-sm">
                                <label htmlFor="contactno">
                                    <strong style={{ color: "#0d987d" }}>
                                        Contact Number
                                    </strong>
                                </label>
                                <input
                                    type="tel"
                                    name="contactno"
                                    required
                                    onChange={handleInput}
                                    placeholder="01XXXXXXXX"
                                    className="form-control rounded-0"
                                />
                                {errors.contactno && (
                                    <span className="text-danger">
                                        {errors.contactno}
                                    </span>
                                )}
                            </div>
                            <div className="col-sm">
                                <label htmlFor="coverimage">
                                    <strong style={{ color: "#0d987d" }}>
                                        Cover Image
                                    </strong>
                                </label>
                                <input
                                    type="file"
                                    name="coverimage"
                                    required
                                    onChange={handleFile}
                                    accept="image/png, image/jpeg , image/jpg"
                                    className="form-control rounded-0"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="btn btn-success w-100 rounded-0 mt-3"
                                style={{
                                    backgroundColor: "#0d987d",
                                    border: "none",
                                }}
                            >
                                <strong>
                                    Post
                                </strong>
                            </button>
                        </div>
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

export default PostAd;
