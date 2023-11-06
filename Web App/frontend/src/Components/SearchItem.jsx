import React from "react";
import "../css/searchitem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsDown,
  faThumbsUp,
  faEye,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";

function SearchItem({ data, ownerDashboard }) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    // Display a confirmation dialog using SweetAlert
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user confirmed the deletion, send the DELETE request
        axios
          .delete(`http://localhost:8081/boarding-houses/delete/${id}`)
          .then((res) => {
            if (res.data.Deleted === "Yes") {
              // Display a success message with SweetAlert
              Swal.fire(
                "Deleted!",
                "Your post has been deleted.",
                "success"
              ).then(() => {
                // Refresh the page
                window.location.reload();
              });
            } else {
              alert("Boarding house deletion failed");
            }
          })
          .catch((err) => console.log("Error deleting boarding house:", err));
      }
    });
  };

  return (
    <div className="searchItem">
      <Link to={`/boarding-houses/${data.Id}`}>
        <img
          src={"http://localhost:8081/images/cover_images/" + data.CoverImage}
          alt=""
          className="siImg"
        />
      </Link>
      <div
        className="siDesc"
        onClick={() => {
          navigate(`/boarding-houses/${data.Id}`);
        }}
      >
        <h1 className="siTitle">{data.Title}</h1>
        <span className="siDistance">
          {data.Distance} from University of Jaffna main premises
        </span>
        <span className="siTaxi">Bus road</span>
        <span className="siSubtitle">not Air conditioning</span>
        <span className="siConditions">
          {data.Boys !== 0 && <>{data.Boys} boys </>}
          {data.Girls !== 0 && <>{data.Girls} girls </>}only
        </span>
        <span className="siFeatures">{data.Facilities}</span>
      </div>
      <div className="siDetails">
        <div className="siDetailsIcons">
          <div className="siDetailsLeft">
            <FontAwesomeIcon icon={faThumbsUp} size="1x" color="#0071c2" />
          </div>
          <div className="siDetailsRight">
            <FontAwesomeIcon icon={faThumbsDown} size="1x" color="red" />
          </div>
        </div>
        <div className="siDetailsTexts">
          {data.Negotiable === "Yes" && (
            <span className="siPriceText">Negotiable</span>
          )}
          <span className="siPrice">Rs {data.Price} /month</span>
          {ownerDashboard !== "show" ? (
            <button
              className="siCheckButton"
              onClick={() => {
                navigate(`/boarding-houses/${data.Id}`);
              }}
            >
              See availability
            </button>
          ) : (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Button
                style={{ marginRight: "5px" }} // Add this line to set the right margin
                className="siButton"
                variant="warning"
                onClick={() => {
                  navigate(`/edit-boarding-house/${data.Id}`);
                }}
              >
                <FontAwesomeIcon icon={faEdit} className="siButtonIcon" /> Edit
              </Button>
              <Button
                style={{ marginRight: "5px" }} // Add this line to set the right margin
                className="siButton"
                variant="success"
                onClick={() => {
                  navigate(`/boarding-houses/${data.Id}`);
                }}
              >
                <FontAwesomeIcon icon={faEye} className="siButtonIcon" /> View
              </Button>
              <Button
                style={{ marginRight: "10px" }} // Add this line to set the right margin
                className="siButton"
                variant="danger"
                onClick={
                  // navigate(
                  //     `/delete-boarding-house/${data.Id}`
                  // );
                  (e) => handleDelete(data.Id)
                }
              >
                <FontAwesomeIcon icon={faTrash} className="siButtonIcon" />{" "}
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchItem;
