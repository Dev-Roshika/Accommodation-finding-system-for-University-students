import axios from "axios";
import React, { Fragment, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RequiredField from "./RequiredField";

const FileUpload = () => {
    const [files, setFiles] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();

    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        //setFiles(selectedFiles);
        const selectedFilesArray = Array.from(selectedFiles);

        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file);
        });

        setSelectedImages((previousImages) =>
            previousImages.concat(imagesArray)
        );
        setFiles((prevFiles) => [...prevFiles, ...selectedFilesArray]);
        // FOR BUG IN CHROME
        event.target.value = "";
    };

    // function deleteHandler(image) {
    //     setSelectedImages(selectedImages.filter((e) => e !== image));
    //     const updatedFiles = files.filter((file) => file !== image);
    //     setFiles(updatedFiles);
    //     URL.revokeObjectURL(image);
    // }
    function deleteHandler(image, index) {
        setSelectedImages(selectedImages.filter((e) => e !== image));

        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);

        URL.revokeObjectURL(image);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (files.length === 0) {
            console.log("No files selected");
            alert("No files selected");
            return;
        }
        console.log("cheking point");
        console.log("files : " + files);
        console.log(files);
        console.log("selectedImages : " + selectedImages);
        if (files.length > 6) {
            console.log("Maximum of 6 files allowed");
            alert("Maximum of 6 files allowed");
            return;
        }
        const formData = new FormData();
        Object.values(files).forEach((file) => {
            formData.append("uploadImages", file);
        });
        try {
            console.log(formData);
            const res = await axios.post(
                `http://localhost:8081/images/upload/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(formData);
            console.log("files : " + files);
            console.log(res);
            alert("Images uploaded successfully");
            navigate("/home");
        } catch (err) {
            if (err.response.status === 500) {
                console.log(err);
            } else {
                console.log(err.response.data.msg);
            }
        }
    };

    return (
        <Fragment>
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
                    <form onSubmit={onSubmit}>
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
                                Add OtherImages for Boarding Houses
                            </h1>
                            <h5 className="text-center text-secondary">
                                Up to 6 images
                            </h5>
                        </div>
                        <div className="p-5">
                            <div className="mb-3">
                                <h6 className="text-center text-secondary">
                                    <RequiredField />
                                    Maximum 6 images allowed.
                                </h6>
                            </div>
                            <div className="mb-3">
                                <input
                                    type="file"
                                    id="file"
                                    name="uploadImages"
                                    accept="image/png, image/jpeg , image/jpg"
                                    multiple
                                    title="Max image count is 6"
                                    onChange={onSelectFile}
                                    className="form-control rounded-0"
                                />
                            </div>
                            {/* <input type="submit" value="Upload" /> */}
                            <div>
                                <Link
                                    to="/owner/login"
                                    className="btn btn-default border w-100 bg-light rounded-0 mb-3"
                                    style={{ color: "#0d987d" }}
                                >
                                    <strong>View</strong>
                                </Link>
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
                                    <strong>Upload</strong>
                                </button>
                            </div>
                            {selectedImages.length > 0 &&
                                (selectedImages.length > 6 ? (
                                    <div className="mb-3">
                                        <p
                                            style={{
                                                textAlign: "center",
                                            }}
                                        >
                                            You can't upload more than 6
                                            images! <br />
                                            <span
                                                style={{
                                                    color: "red",
                                                }}
                                            >
                                                please delete{" "}
                                                <b>
                                                    {" "}
                                                    {selectedImages.length -
                                                        6}{" "}
                                                </b>{" "}
                                                of them{" "}
                                            </span>
                                        </p>
                                    </div>
                                ) : (
                                    <div className="mb-3">
                                        <button
                                            className="upload-btn"
                                            onClick={() => {
                                                console.log(selectedImages);
                                            }}
                                        >
                                            UPLOAD {selectedImages.length} IMAGE
                                            {selectedImages.length === 1
                                                ? ""
                                                : "S"}
                                        </button>
                                    </div>
                                ))}
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
                        <span className="text-white">© 2023 Copyright:</span>
                        &nbsp;
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
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {selectedImages &&
                    selectedImages.map((image, index) => {
                        console.log(image);
                        return (
                            <div
                                key={image}
                                style={{
                                    margin: "1rem 0.5rem",
                                    position: "relative",
                                    boxShadow:
                                        "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                                }}
                            >
                                <img src={image} height="200" alt="upload" />
                                <button
                                    onClick={() => deleteHandler(image, index)}
                                    style={{
                                        position: "absolute",
                                        bottom: 0,
                                        right: 0,
                                        cursor: "pointer",
                                        border: "none",
                                        color: "white",
                                        backgroundColor: "lightcoral",
                                        ":hover": {
                                            backgroundColor: "red",
                                        },
                                    }}
                                >
                                    delete image
                                </button>
                                <p
                                    style={{
                                        padding: "0 0.5rem",
                                        margin: 0,
                                    }}
                                >
                                    {index + 1}
                                </p>
                            </div>
                        );
                    })}
            </div>
        </Fragment>
    );
};

export default FileUpload;
