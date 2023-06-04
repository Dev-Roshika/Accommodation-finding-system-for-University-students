import React from "react";
import "../css/searchitem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";


function SearchItem({data}) {
  const navigate = useNavigate();
  return (
    <div className="searchItem" >
      <Link to ={`/boarding-houses/${data.Id}`}>
        <img
          src={'http://localhost:8081/images/cover_images/' + data.CoverImage}
          alt=""
          className="siImg"
          />
      </Link>
      <div className="siDesc" onClick={()=>{navigate(`/boarding-houses/${data.Id}`)}}>
        <h1 className="siTitle">
            {data.Title}
        </h1>
        <span className="siDistance">
          {data.Distance} from University of Jaffna main premises
        </span>
        <span className="siTaxi">Bus road</span>
        <span className="siSubtitle">not Air conditioning</span>
        <span className="siConditions">
          {(data.Boys !==0) && <>{data.Boys} boys </>}
          {(data.Girls !==0) && <>{data.Girls} girls </>}only
        </span>
        <span className="siFeatures">{data.Facilities}</span>
      </div>
      <div className="siDetails">
        <div className="siDetailsIcons">
          <div className="siDetailsLeft">
            <FontAwesomeIcon icon={faThumbsUp} size="1x" color="#0071c2"/>
          </div>
          <div className="siDetailsRight">
            <FontAwesomeIcon icon={faThumbsDown} size="1x" color="red"/>
          </div>
        </div>
        <div className="siDetailsTexts">
              {(data.Negotiable === 'Yes') && <span className="siPriceText">Negotiable</span>}
            <span className="siPrice">Rs {data.Price} /month</span>
            
            <button className="siCheckButton" onClick={()=>{ navigate(`/boarding-houses/${data.Id}`)}}>See availability</button>
        </div>
      </div>
    </div>

  );
}

export default SearchItem;
