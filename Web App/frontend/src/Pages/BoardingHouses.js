import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import "../css/boardinghouses.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";

function BoardingHouses() {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const photos = [
    {
      src: "./Images/images (3).jpg",
    },
    {
      src: "./Images/download.jpg",
    },
    {
      src: "./Images/images.jpg",
    },
    {
      src: "./Images/images (1).jpg",
    },
    {
      src: "./Images/images (2).jpg",
    },
  ];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };
  const handleMove = (direction) =>{
    let newSlideNumber;

    if(direction === "l"){
      newSlideNumber = slideNumber === 0 ? 4: slideNumber - 1
    } else{
      newSlideNumber = slideNumber === 4 ? 0: slideNumber + 1
    }
    setSlideNumber(newSlideNumber);
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="boardingContainer">
        {open &&
          <div className="slider">
            <FontAwesomeIcon icon={faCircleXmark} onClick={()=> setOpen(false)} className='close'/>
            <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={()=>handleMove("l")} />
              <div className="sliderWrapper">
                <img src ={photos[slideNumber].src} alt='' className="sliderImg"/>
              </div>
            <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={()=>handleMove("r")}/>
          </div>}
        <div className="boardingWrapper">
          <button className="bookNow">Reserve or Book Now</button>
          <h1 className="boardingTitle">Title of the boarding</h1>
          <div className="boardingAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>958/35, KKS road, Jaffna</span>
          </div>
          <span className="boardingDistance">
            Excellent location 500m from the University of Jaffna main premises
          </span>
          <span className="boardingPriceHighlight">Rs 50,000 /month</span>
          <div className="boardingImages">
            {photos.map((photo, i) => (
              <div className="boardingImgWrapper">
                <img
                  onClick={()=>handleOpen(i)}
                  src={photo.src}
                  alt=""
                  class="boardingImg"
                />
              </div>
            ))}
          </div>
          <div className="boardingDetails">
            <div className="boardingDetailsTexts">
              <h1 className="boardingTitle">Title of the boarding</h1>
              <p className="boardingDesc">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
                nisi, obcaecati expedita assumenda dolorum maiores corporis
                animi ducimus ratione eos.
              </p>
            </div>
            <div className="boardingDetailsPrice">
              <h2>
                <b>Rs. 50,000/ month</b>
              </h2>
              <button>Reserve or Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardingHouses;
