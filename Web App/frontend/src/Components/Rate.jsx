import React, {useState } from "react";
import "../css/Rate.css";
import { FaStar } from "react-icons/fa";

import axios from 'axios';


const Rate = (props) => {
  /*useEffect(()=>{
      const updateRate = async() =>{
      try{
          await axios.put("http://localhost:8081/boarding_house/rate_amount") 
          console.log("work")
          
        }catch(err){
            
          console.log("error")
          console.log(err)
        }
      }
      updateRate();
  },[])*/
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  //const [rate,rateCount]=useState("NO");
  //const [value,ratValue]=useState(0);

  const SendData=(rateValue)=>{
    
      axios
     .post("http://localhost:8081/rate/rate_amount",{
      id: props.id,
      value: rateValue
    })
     
     .catch((err) => console.log(err));

  }
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const rateValue = i + 1;
        return (
          <lable>
            <input
              type="radio"
              name="rating"
              value={rateValue}


            />
            <FaStar
              className="starStyle"
              color={rateValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onClick={() => { setRating(rateValue);console.log(rateValue);
                SendData(rateValue);
                
                 
              }}
              onMouseOver={() => setHover(rateValue)}
              onMouseLeave={() => setHover(null)}
              size={40}
            />

          </lable>
        );

      })}

    </div>
  );

};
export default Rate;