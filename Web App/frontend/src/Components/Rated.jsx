import React,{useState,useEffect} from "react";
//import "../css/Rate.css";
import {FaStar} from "react-icons/fa";
import axios from 'axios';

const Rated=(props)=>{


    useEffect(() => {
      axios
        .get(`http://localhost:8081/boardingRated-data/${props.id}`)
        .then((res) => {
          if (res.data.averageRating !== undefined) {
            setRating(res.data.averageRating);
          } else {
            // Handle the case where no ratings are available
            setRating(0);
          }
          console.log("Data is fetched successfully");
        })
        .catch((error) => {
          console.error("Error fetching data from backend:", error);
        });
    }, [props.id]);
  const [rating,setRating]=useState(1);
  
   return(
    <div>
      {[...Array(5)].map((star,i)=>{
        const rateValue=i+1;
      return(
      //<lable> 
        
        <FaStar 
        key={i+1}
        className="starStyle" 
        color={rateValue <= rating ? "#ffc107":"#e4e5e9"}
         
        size={40}
        />
        //</lable>
        );
    
    })}
      
    </div>
   );
   
};
export default Rated;