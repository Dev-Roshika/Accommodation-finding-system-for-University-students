import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Validation from "../../Validation/updateAdValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function Update({ initialValues }) {
  const { id } = useParams();
  const [values, setValues] = useState({
    Title: "",
    Description: "",
    Price: "",
    Address: "",
    distance: "",
    distanceUnit: "",
    boys: "",
    girls: "",
    Facilities: "",
    Rules: "",
    ContactNo: "",
  });
  const [errors, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [numberOfPersons, setNumberOfPersons] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [distanceValue, setDistanceValue] = useState("");
  const [file, setFile] = useState();
  //const [distanceUnit, setDistanceUnit] = useState("");
  const [coverImageName, setCoverImageName] = useState("");
  const [open, setOpen] = useState(false);

  const handleUnitChange = (event) => {
    const selectedUnit = event.target.value;
    setSelectedUnit(selectedUnit);

    if (selectedUnit === "meter") {
      console.log("test console");
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
  // useEffect(() => {
  //     if(selectedUnit === "meter"){
  //         setValues((prev) => ({
  //             ...prev,
  //             distanceUnit: "m",
  //         }));
  //     } else if (selectedUnit === "kilometer") {
  //         setValues((prev) => ({
  //             ...prev,
  //             distanceUnit: "km",
  //         }));
  //     }
  // }, [selectedUnit]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setNumberOfPersons("");
  };

  const handleNumberOfPersonsChange = (event) => {
    const selectedValue = event.target.value;
    setNumberOfPersons(selectedValue);
    console.log(selectedValue);
    if (selectedOption === "boys") {
      setValues((prev) => ({
        ...prev,
        boys: selectedValue,
      }));
      console.log("boys inside selectedValue: " + selectedValue);
    } else if (selectedOption === "girls") {
      setValues((prev) => ({
        ...prev,
        girls: selectedValue,
      }));
      console.log("girls inside selectedValue: " + selectedValue);
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
    console.log("event.target.files[0]: " + event.target.files[0]);
    console.log(event.target.files[0]);
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setCoverImageName(selectedFile.name); // Display the selected file name
  };

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues); // Set the initial state based on the provided initialValues
      setSelectedOption(initialValues.Boys > 0 ? "boys" : "girls");
      setNumberOfPersons(
        initialValues.Boys > 0 ? initialValues.Boys : initialValues.Girls
      );
      setIsChecked(initialValues.Negotiable === "Yes" ? true : false);
      const distanceValue = initialValues.Distance
        ? initialValues.Distance.split(" ")[0]
        : ""; // Extract the numerical part before the space
      setDistanceValue(distanceValue);
      console.log("distanceValue: " + distanceValue);
      if (initialValues.Distance && initialValues.Distance.includes("m")) {
        setSelectedUnit("meter");
      } else {
        setSelectedUnit("kilometer");
      }
      if (distanceValue) {
        setValues((prev) => ({
          ...prev,
          distance: distanceValue,
        }));
      }
      setCoverImageName(
        initialValues.CoverImage ? initialValues.CoverImage : ""
      );
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
      if (selectedOption === "boys") {
        setValues((prev) => ({
          ...prev,
          boys: numberOfPersons,
        }));
        console.log("boys inside selectedValue: " + numberOfPersons);
      } else if (selectedOption === "girls") {
        setValues((prev) => ({
          ...prev,
          girls: numberOfPersons,
        }));
        console.log("girls inside selectedValue: " + numberOfPersons);
      }
    }
  }, [initialValues]);

  const handleSubmit = async (event) => {
    console.log("inside handle submit-start");
    event.preventDefault();
    const validationErrors = Validation(values);
    console.log("distance value : " + distanceValue);
    console.log("selectedunit : " + selectedUnit);
    console.log("values.distanceUnit : " + values.distanceUnit);
    setErrors(validationErrors);
    if (validationErrors.ContactNo !== "") {
      console.log("inside if - validationErrors.ContactNo !== ''");
      return; // Stop further execution of the handleSubmit function
    }
    var negotiable_or_not = "";
    if (isChecked) {
      negotiable_or_not = "Yes";
    } else {
      negotiable_or_not = "No";
    }
    console.log("negotiable_or_not: " + negotiable_or_not);
    const formData = new FormData();
    if (file) {
      // Append the cover image only if a new one is selected
      formData.append("coverimage", file);
    }
    formData.append("title", values.Title);
    formData.append("description", values.Description);
    formData.append("price", values.Price);
    formData.append("negotiable", negotiable_or_not);
    formData.append("address", values.Address);
    formData.append("distance", values.distance);
    formData.append("distanceUnit", values.distanceUnit);
    // formData.append("boys", values.boys);
    // formData.append("girls", values.girls);
    if (selectedOption === "boys") {
        formData.append("boys", numberOfPersons);
      } else if (selectedOption === "girls") {
        formData.append("girls", numberOfPersons);
      }
    formData.append("facilities", values.Facilities);
    formData.append("rules", values.Rules);
    formData.append("contactno", values.ContactNo);
    console.log("formData is below");

    console.log(formData.girls);
    console.log("file: " + file);
    console.log("title : " + values.Title);
    console.log("description: " + values.Description);
    console.log("negotiable: " + negotiable_or_not);
    console.log("Address: " + values.Address);
    console.log("distance: " + values.distance);
    console.log("distanceUnit: " + values.distanceUnit);
    if (selectedOption === "boys") {
      console.log("boys: " + values.boys);
    } else {
      console.log("girls: " + values.girls);
    }
    console.log("facilities: " + values.Facilities);
    console.log("rules: " + values.Rules);
    console.log("contactNo: " + values.ContactNo);
    console.log("FormData content:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    axios
      .put(`http://localhost:8081/update/boarding-data/${id}`, formData)
      .then((res) => {
        if (res.data !== "") {
          console.log("success here");
          const boardingId = res.data.boardingId;
          console.log(res.data);
          navigate("/owner/post-ad-update/success/" + boardingId);
        } else {
          console.log("Not success here");
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //     if (open) {
  //         document.body.style.overflow = "hidden";
  //     } else {
  //         document.body.style.overflow = "auto";
  //     }
  // }, [open]);

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
              Edit
            </h1>
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
          {open && (
            <>
              <div
                style={{
                  position: "fixed",
                  top: "15%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "rgba(0, 0, 0, 0.486)",
                  zIndex: 999,
                  padding: "50px",
                  overflow: "auto",
                }}
              >
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  onClick={() => setOpen(false)}
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    fontSize: "30px",
                    color: "lightgray",
                    cursor: "pointer",
                  }}
                />
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={
                      "http://localhost:8081/images/cover_images/" +
                      coverImageName
                    }
                    alt=""
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </>
          )}
          <div className="p-5">
            <div className="mb-3">
              <label htmlFor="title">
                <strong style={{ color: "#0d987d" }}>Title</strong>
              </label>
              <input
                type="text"
                name="Title"
                required
                value={values.Title}
                onChange={handleInput}
                placeholder={"e.g. Name of the boarding place"}
                className="form-control rounded-0"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description">
                <strong style={{ color: "#0d987d" }}>Description</strong>
              </label>
              <textarea
                type="text"
                name="Description"
                required
                value={values.Description}
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
                    background: selectedOption ? "rgba(13, 152, 125, 0.5)" : "",

                    fontWeight: selectedOption ? "bold" : "",
                    color: selectedOption ? "white" : "black",
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
                      <strong style={{ color: "#0d987d" }}>
                        Number of {selectedOption}
                      </strong>
                    </label>
                    <div className="input-group">
                      <input
                        type="number"
                        name="numberOfPersons"
                        required
                        value={numberOfPersons}
                        onChange={handleNumberOfPersonsChange}
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
                <strong style={{ color: "#0d987d" }}>Negotiable</strong>
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
                <strong style={{ color: "#0d987d" }}>Price</strong>
              </label>
              <input
                type="number"
                name="Price"
                required
                value={values.Price}
                onChange={handleInput}
                placeholder="Rs."
                className="form-control rounded-0"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address">
                <strong style={{ color: "#0d987d" }}>Address</strong>
              </label>
              <textarea
                type="text"
                name="Address"
                required
                value={values.Address}
                onChange={handleInput}
                className="form-control rounded-0"
                rows={4}
              ></textarea>{" "}
            </div>
            <div className="d-flex mb-3">
              <div className="col-sm">
                <label htmlFor="distance">
                  <strong style={{ color: "#0d987d" }}>Distance</strong>
                </label>
                <input
                  type="number"
                  name="distance"
                  required
                  value={values.distance}
                  onChange={handleInput}
                  min="0"
                  placeholder="Distance from UoJ main premises"
                  className="form-control rounded-0"
                />
              </div>
              <div className="col-sm ms-2">
                <label htmlFor="distanceUnit">
                  <strong style={{ color: "#0d987d" }}>Unit</strong>
                </label>
                <select
                  name="distanceUnit"
                  value={selectedUnit}
                  required
                  onChange={handleUnitChange}
                  className="form-select rounded-0"
                  style={{
                    background: selectedUnit ? "rgba(13, 152, 125, 0.5)" : "",

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
                <strong style={{ color: "#0d987d" }}>Facilities</strong>
              </label>
              <textarea
                type="text"
                name="Facilities"
                required
                value={values.Facilities}
                placeholder="e.g. 4 generous bedrooms ,1 Separate toilet/bathroom, 4 bedrooms"
                onChange={handleInput}
                className="form-control rounded-0"
                rows={4}
              ></textarea>{" "}
            </div>
            <div className="mb-3">
              <label htmlFor="rules">
                <strong style={{ color: "#0d987d" }}>Rules</strong>
              </label>
              <textarea
                type="text"
                name="Rules"
                required
                value={values.Rules}
                placeholder="e.g. No smoking, No alcohol, No pets, No outsiders allowed"
                onChange={handleInput}
                className="form-control rounded-0"
                rows={4}
              ></textarea>{" "}
            </div>
            <div className="mb-3 row">
              <div className="col-sm">
                <label htmlFor="contactno">
                  <strong style={{ color: "#0d987d" }}>Contact Number</strong>
                </label>
                <input
                  type="tel"
                  name="ContactNo"
                  required
                  value={values.ContactNo}
                  onChange={handleInput}
                  placeholder="01XXXXXXXX"
                  className="form-control rounded-0"
                />
                {errors.contactno && (
                  <span className="text-danger">{errors.contactno}</span>
                )}
              </div>
              <div className="col-sm">
                <label htmlFor="coverimage">
                  <strong style={{ color: "#0d987d" }}>Cover Image</strong>
                </label>
                {/* <input
                                    type="file"
                                    name="coverimage"
                                    required
                                    onChange={handleFile}
                                    accept="image/png, image/jpeg , image/jpg"
                                    className="form-control rounded-0"
                                /> */}
                <div className="input-group">
                  {(!initialValues ||
                    Object.keys(initialValues).length === 0 ||
                    coverImageName === "") && (
                    <input
                      type="file"
                      name="coverimage"
                      required
                      onChange={handleFile}
                      accept="image/png, image/jpeg, image/jpg"
                      className="form-control rounded-0"
                    />
                  )}
                  {coverImageName && (
                    <>
                      <input
                        type="text"
                        className="form-control rounded-0"
                        value={coverImageName}
                        title={coverImageName}
                        readOnly
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          setOpen(true);
                        }}
                        style={{
                          backgroundColor: "rgba(13, 152, 125)",
                          color: "white",
                          border: "1px solid #ced4da",
                        }}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          setCoverImageName("");
                          setFile(null);
                        }}
                        style={{
                          backgroundColor: "rgba(13, 152, 125)",
                          color: "white",
                          border: "1px solid #ced4da",
                        }}
                      >
                        Change
                      </button>
                    </>
                  )}
                </div>
                {values.CoverImage && <p>Selected file: {values.CoverImage}</p>}
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
                <strong>Post</strong>
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

export default Update;
