import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import "../css/boardinghouses.css";
import { FaStar } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleArrowLeft,
    faCircleArrowRight,
    faCircleXmark,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../Components/Footer";
import Rate from "../Components/Rate";
import Rated from "../Components/Rated";
import GetComment from "../Components/GetComment";

function BoardingHouses() {
   
    const { id } = useParams();
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
   // const [rate,setRate]=useState(false);
    const [Data, setData] = useState([]);
    const [Popup,setPopup]=useState(false);
    const [cilck,setClick]=useState(false);
    const [comcont,setComcont]=useState("");
    const [item,setItem]=useState([]);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios
            .get("http://localhost:8081")
            .then((res) => {
                if (
                    res.data.Valid &&
                    (res.data.Role === "student" || res.data.Role === "owner")
                ) {
                    console.log(res.data.role + "is a valid user");
                } else {
                    navigate("/");
                }
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        axios
            .get(`http://localhost:8081/boarding-data/${id}`)
            .then((res) => {
                console.log(res.data);
                setData(res.data);
                console.log("data is fetched successfully");
                // eslint-disable-next-line
                // JSON.parse(Datax.OtherImages).map((filename) => {
                //   setOtherImages((prev) => [...prev, filename]);
                //   console.log("Filename:", filename);
                // });
                // console.log("OtherImages:", otherImages)
                console.log(Data);
            })
            .catch((error) => {
                console.error("Error, fetching data from backend:", error);
            });
                axios
                  .get(`http://localhost:8081/arrayvalue/${id}`)
                  .then((res) => {
                   console.log(res.data);
                   setItem(res.data);
                    console.log("data is fetched successfully");
                
            })
            .catch((error) => {
                console.error("Error, fetching data from backend:", error);
            });
            
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        
                axios
                  .get(`http://localhost:8081/arrayvalue/${id}`)
                  .then((res) => {
                   console.log(res.data);
                   setItem(res.data);
                    console.log("data is fetched successfully");
                
            })
            .catch((error) => {
                console.error("Error, fetching data from backend:", error);
            });
            
        // eslint-disable-next-line
    }, [{id}]);
   
    // const photos = [
    //   {
    //     src: "./Images/images (3).jpg",
    //   },
    //   {
    //     src: "./Images/download.jpg",
    //   },
    //   {
    //     src: "./Images/images.jpg",
    //   },
    //   {
    //     src: "./Images/images (1).jpg",
    //   },
    //   {
    //     src: "./Images/images (2).jpg",
    //   },
    // ];
   /*const SetRating =()=>{
    useEffect(() => {
        //setRate(true);
		
        axios
            .post(`http://localhost:8081/boarding_house/rate_amount/`,Data.Id)
            
            .catch((err) => console.log(err));
        }, []);
    };*/


    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    };
    const handleMove = (direction) => {
        let newSlideNumber;

        if (direction === "l") {
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
        } else {
            newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
        }
        setSlideNumber(newSlideNumber);
    };
    const openPopup=()=>{
         setPopup(!Popup);
    }
    const closePopup=()=>{
        setPopup(false);
    }
    const clicked=()=>{
        setClick(!cilck);
    }
    const handleChange = (event) => {
        setComcont(event.target.value);
      }
    const setcomment=()=>{
        axios
        .post("http://localhost:8081/comments",{
         id:id ,
         value: comcont
       })
        .catch((err) => console.log(err));
        setComcont("");
    }
    
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <Header type="list" />
            <div className="boardingContainer">
                {open && (
                    <div className="slider">
                        <FontAwesomeIcon
                            icon={faCircleXmark}
                            onClick={() => setOpen(false)}
                            className="close"
                        />
                        <FontAwesomeIcon
                            icon={faCircleArrowLeft}
                            className="arrow"
                            onClick={() => handleMove("l")}
                        />
                        <div className="sliderWrapper">
                            <img
                                src={
                                    "http://localhost:8081/images/" +
                                    JSON.parse(Data[0].OtherImages)[slideNumber]
                                }
                                alt=""
                                className="sliderImg"
                            />
                        </div>
                        <FontAwesomeIcon
                            icon={faCircleArrowRight}
                            className="arrow"
                            onClick={() => handleMove("r")}
                        />
                    </div>
                )}
                <div className="boardingWrapper">
                    <button className="bookNow">Reserve or Book Now</button>
                    <h1 className="boardingTitle">Title of the boarding</h1>
                    <div className="boardingAddress">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>958/35, KKS road, Jaffna</span>
                    </div>
                    <span className="boardingDistance">
                        Excellent location 500m from the University of Jaffna
                        main premises
                    </span>
                    <span className="boardingPriceHighlight">
                        Rs 50,000 /month
                    </span>
                    <div className="boardingImages">
                        {
                            // eslint-disable-next-line
                            Data.map((item) => {
                                console.log("checking");
                                console.log(Data);
                                console.log(Data[0]);
                                console.log(Data[0].OtherImages);
                                return (
                                    <div className="boardingImgWrapperMain">
                                        { item.OtherImages &&
                                            // eslint-disable-next-line
                                            JSON.parse(item.OtherImages).map(
                                                (file_name, i) => {
                                                    console.log(file_name);
                                                    console.log(
                                                        item.OtherImages[0]
                                                    );
                                                    console.log(
                                                        item.OtherImages[1]
                                                    );
                                                    console.log(
                                                        item.OtherImages[2]
                                                    );
                                                    console.log(
                                                        item.OtherImages[3]
                                                    );
                                                    return (
                                                        <div
                                                            className="boardingImgWrapper"
                                                            key={i}
                                                        >
                                                            <img
                                                                onClick={() =>
                                                                    handleOpen(
                                                                        i
                                                                    )
                                                                }
                                                                src={
                                                                    "http://localhost:8081/images/" +
                                                                    file_name
                                                                }
                                                                alt=""
                                                                className="boardingImg"
                                                            />
                                                        </div>
                                                    );
                                                }
                                            )
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="boardingDetails">
                        <div className="boardingDetailsTexts">
                            <h1 className="boardingTitle">
                                Title of the boarding
                            </h1>
                            <p className="boardingDesc">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Sunt nisi, obcaecati expedita
                                assumenda dolorum maiores corporis animi ducimus
                                ratione eos.
                            </p>
                            <div className="aligncont">
                                <div>{//<Rate id={id}/>}
                            <Rated id={id}/>}</div>
                                
                            <div className="rateButtonAlign">
                            <div>
                            <button className="ratebutton" onClick={openPopup}>give your rate</button>
                            {Popup?
                            <div>
                                <div className="backgrnd">
                                    <div className="popup" >
                                    <h1 className="alignhdr" onClick={closePopup}>X</h1>
                                    <div className="alignstar">
                                        
                                    <Rate id={id}/>
                                    <p className="alignp">Rate here...</p>
                                    </div>
                                    </div>
                                </div>
                                </div>:""}
                            </div>
                            <div>
                            <button className="ratebutton" onClick={clicked}>comment here</button>
                            </div>
                            </div>
                            <div className="disbcont">
                            {item.map((items,index)=>{
                                return (
                                    <div className="arrayalgn"  key={items.id}>
                                    <div>
                                       {[...Array(5)].map((star,j)=>{
                                           return (
                                               <FaStar 
                                                 key={j}
                                                      color={ j<= items.id ? "#ffc107":"#e4e5e9"}
                                                     size={20}
                                               />
                                                );
                                         })}
                                         
                                  </div>
                                  <div><div className="ntsa">
                                  <p className="palign">{items.value}</p>
                                  
                                  </div>
                                  
                                  </div>
                                  </div>
                                  
                                    );
                                    
                            })}
                                   
                            
                                    </div>
                            
                            
                            </div>
                            
                            
                            

                        </div>
                        <div className="boardingDetailsPrice">
                            <h2>
                                <b>Rs. 50,000/ month</b>
                            </h2>
                            <button>Reserve or Book Now</button>
                        </div>
                    </div>
                    <div className="App">
                    {cilck ?<div>
                                <div className="commentbox">
                                <h5 className="commenttext">Comment here</h5>
                                <textarea className="inputbox" value={comcont} onChange={handleChange}/>
                                <button className="sbtn" onClick={setcomment}>submit</button>
                               </div></div>:""}
                              <div>
                              <h4>Reviews</h4>
                              <GetComment id={id}/>
                              
                                </div>
                             </div>
                </div>
                
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}

export default BoardingHouses;
