import React from "react";
import "../css/searchitem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

function SearchItem() {
  return (
    <div className="searchItem">
      <img
        src="https://www.stcb.edu.lk/infrastructure/images/hostel.jpg"
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">Title - boarding house</h1>
        <span className="siDistance">
          500m from University of Jaffna main premises
        </span>
        <span className="siTaxi">Bus road</span>
        <span className="siSubtitle">not Air conditioning</span>
        <span className="siConditions">10 boys only</span>
        <span className="siFeatures">3 bedrooms . 1 bathroom</span>
      </div>
      <div className="siDetails">
        <div className="siDetailsIcons">
          <div className="siDetailsLeft">
            <FontAwesomeIcon icon={faThumbsUp} size="2x" color="#0071c2"/>
          </div>
          <div className="siDetailsRight">
            <FontAwesomeIcon icon={faThumbsDown} size="2x" color="red"/>
          </div>
        </div>
        <div className="siDetailsTexts">
            <span className="siPriceText">Negotiable</span>
            <span className="siPrice">Rs 50,000 /month</span>
            <button className="siCheckButton">See availability</button>
        </div>
      </div>
    </div>
  );
}

export default SearchItem;
