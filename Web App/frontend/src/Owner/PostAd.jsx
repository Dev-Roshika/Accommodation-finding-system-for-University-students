import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/postAd.css";

function PostAd() {
    const [values, setValues] = useState({
        title: "",
        description: "",
        price: "",
        address: "",
        distance: "",
        boys: "",
        girls: "",
        facilities: "",
        rules: "",
        contactno: "",
    });
    const [isChecked, setIsChecked] = useState(false);

    const [file, setFile] = useState();
    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues((prev) => ({
            ...prev,
            [event.target.name]: [event.target.value],
        }));
    };

    const handleFile = (event) => {
        //console.log(event.target.files[0])
        setFile(event.target.files[0]);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
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
        formData.append("boys", values.boys);
        formData.append("girls", values.girls);
        formData.append("facilities", values.facilities);
        formData.append("rules", values.rules);
        formData.append("contactno", values.contactno);
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
        // <div>
        //   <div className='d-flex flex-direction-column'>
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
                            Post Ad for Boarding Houses
                        </h1>
                        <h5 className="text-center text-secondary">
                            Fill out form to get started
                        </h5>
                    </div>
                    <div className="p-5">
                        <div className="mb-3">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                name="title"
                                onChange={handleInput}
                                className="form-control rounded-0"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description">Description</label>
                            <textarea
                                type="text"
                                name="description"
                                onChange={handleInput}
                                className="form-control rounded-0"
                                rows={4} // Specify the number of visible rows for the textarea
                            ></textarea>{" "}
                        </div>
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-sm">
                                    <label htmlFor="price">Price</label>
                                    <input
                                        type="text"
                                        name="price"
                                        onChange={handleInput}
                                        className="form-control rounded-0"
                                    />
                                </div>
                                <div className="col-sm d-flex flex-column align-items-center">
                                    <label htmlFor="nagotiable">
                                        Negotiable
                                    </label>
                                    <input
                                        type="checkbox"
                                        name="nagotiable"
                                        checked={isChecked}
                                        onChange={() =>
                                            setIsChecked((prev) => !prev)
                                        }
                                        className="form-check-input custom-checkbox rounded-0"
                                        />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="title">Address</label>
                            <input
                                type="text"
                                name="address"
                                onChange={handleInput}
                                className="form-control rounded-0"
                            />
                        </div>
                        <div>
                            <label htmlFor="distance">Distance</label>
                            <input
                                type="text"
                                name="distance"
                                onChange={handleInput}
                                className="form-control rounded-0"
                            />
                        </div>
                        <div>
                            <label htmlFor="title">Boys</label>
                            <input
                                type="text"
                                name="boys"
                                onChange={handleInput}
                                className="form-control rounded-0"
                            />
                        </div>
                        <div>
                            <label htmlFor="title">Girls</label>
                            <input
                                type="text"
                                name="girls"
                                onChange={handleInput}
                                className="form-control rounded-0"
                            />
                        </div>
                        <div>
                            <label htmlFor="facilities">Facilities</label>
                            <input
                                type="text"
                                name="facilities"
                                onChange={handleInput}
                                className="form-control rounded-0"
                            />
                        </div>
                        <div>
                            <label htmlFor="rules">Rules</label>
                            <input
                                type="text"
                                name="rules"
                                onChange={handleInput}
                                className="form-control rounded-0"
                            />
                        </div>
                        <div>
                            <label htmlFor="contactno">Contact Number</label>
                            <input
                                type="text"
                                name="contactno"
                                onChange={handleInput}
                                className="form-control rounded-0"
                            />
                        </div>
                        <div>
                            <label htmlFor="title">Cover Image</label>
                            <input
                                type="file"
                                name="coverimage"
                                onChange={handleFile}
                                accept="image/png, image/jpeg , image/jpg"
                                className="form-control rounded-0"
                            />
                        </div>
                        <div>
                            <button type="submit">Post</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PostAd;
