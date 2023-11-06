//import axios from "axios";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MDBFooter } from "mdb-react-ui-kit";
//import Footer from "./Components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
//import Navbar from "./Components/Navbar";


function OnBoardPage() {
  const navigate = useNavigate();
  const [Student_Clicked, setStudent_Clicked] = useState(false);
  const [Owner_Clicked, setOwner_Clicked] = useState(false);
  const [currentImage, setCurrentImage] = useState(1);


  const [showFullText, setShowFullText] = useState(false);

  // Your text content
  const textContent =
    "Welcome to UniAccommodations, your one-stop solution for university housing. We understand the challenges of finding ideal student housing and are here to simplify your search. Explore a variety of tailored accommodation options, with easy access to key details like room count, fees, faculty proximity, and amenities.We go the extra mile by providing direct access to property owners' contact information, making inquiries and arrangements a breeze. Our platform ensures a pleasant stay with comprehensive accommodation rules.Join our student community, share insights, and help others with our feedback system. Students can register, while owners can list their properties to connect directly with students. Whether you're a student seeking comfort or an owner looking for tenants, your journey to the perfect university accommodation begins here."
  // Function to toggle full text visibility
  const toggleFullText = () => {
    setShowFullText(!showFullText);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Change the image every 3 seconds
      setCurrentImage((prevImage) => (prevImage === 3 ? 1 : prevImage + 1));
    }, 3000);

    return () => {
      clearInterval(interval); // Cleanup the interval on unmount
    };
  }, []);

  const getImageSource = () => {
    // Return the image source based on the currentImage state
    return `http://localhost:8081/images/Onboard_Images/wallpaper${currentImage}.jpg`;
  };



  const scrollToMiddle = () => {
    const windowHeight = window.innerHeight;
    const middleOffset = document.body.scrollHeight / 2 - windowHeight / 3;
    window.scrollTo(0, middleOffset);
  };
  

  const handleLogin = async () => {
    try {
      await axios.get("http://localhost:8081/logout");
      scrollToMiddle(); // Scroll to the middle of the page
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  
  const handleAccount = async () => {
    window.location.href = "/profile";
  };
  const demoContactDetails = "Contact: (123) 456-7890 | Email: demo@example.com";
  const demoAddress = "1234 Demo Street, Demo City, Demo Country";
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8081")
      .then((res) => {
        if (
          res.data.Valid &&
          (res.data.Role === "student" || res.data.Role === "owner")
        ) {
          navigate("/home");
        } else if (Student_Clicked) {
          navigate("/student/login");
        } else if (Owner_Clicked) {
          navigate("/student/owner");
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);
  return (
    <div className="d-flex flex-column min-vh-100">
    
        
    <div className="navbar">
  <div className="navContainer">
    <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
      <img src="http://localhost:8081/images/Onboard_Images/images.jpg" alt="UniAccommodations Logo" style={{ maxWidth: '50px', marginRight: '10px' }} />
      <span
        onClick={() => (window.location.href = "/")}
        title="Go to Home Page"
        style={{ cursor: "pointer" }}
      >
        UniAccommodations
      </span>
    </div>
    <div className="navItems">
       {/* <button className='navButton'><Link to ="/profile">Account</Link></button> */}
      <button className="navButton" onClick={handleLogin}>
        LogIn
      </button>
    </div>
  </div>
</div>

        
      <div
        className="card"
        style={{
         
           padding: "0px",
          // margin: "0 50px",
           display: "flex",
           justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          className="card-img-top"
          src={getImageSource()}
          alt="....."
          style={{
            width: "100%",
            maxHeight: "400px", // Set a maximum height to limit image size
            objectFit: "cover", // Ensure the image covers the full width
          }}
        />
      </div>

      <div
        className="col-sm"
        style={{ textAlign: "center", padding: "20px" }}
      >
        <p
          className="text-center text-content"
          style={{
            fontSize: "18px",
            lineHeight: "1.5",
            color: "#333", // Default text color
            transition: "color 0.3s", // Add a smooth transition for color change
            cursor: "pointer", // Change cursor on hover
          }}
          onMouseEnter={(e) => (e.target.style.color = "green")} // Change text color on hover
          onMouseLeave={(e) => (e.target.style.color = "#333")} // Reset text color when not hovered
        >
          {/* Show the full text if showFullText is true, otherwise, show a truncated version */}
          {showFullText ? textContent : textContent.slice(0, 300) + "..."}

          {/* Render the "Read More" button */}
          <Button
            variant="link"
            onClick={toggleFullText}
            style={{ color: "blue", cursor: "pointer" }}
          >
            {showFullText ? "Read Less" : "Read More"}
          </Button>
        </p>
      </div>
      <div className="col-sm-1 border-right"></div>
      <div className="container">
        <div className="row justify-content-center g-50">
        

<div className="col-sm-5">
  <div className="card" style={{ width: '600px', padding: '0px', margin: '0 50px' }}>
    <img
      className="card-img-top"
      src="http://localhost:8081/images/Onboard_Images/student.jpg"
      alt="....."
      style={{
        width: '500px',
        height: '400px',
        objectFit: 'contain',
        // Add border style here
      }}
    />
    <div className="card-body">
    
   
      <div className="text-center mb-3 p-3">
        <a href="http://localhost:3000/student/login" target="_self">
          <Button
            type="submit"
            variant="outline-dark"
            size="lg"
            onClick={() => setStudent_Clicked(true)}
          >
            Student
          </Button>
        </a>
      </div>
    </div>
  </div>
</div>

<div className="col-sm-5">
  <div className="card" style={{ width: '600px', padding: '0px', margin: '0 50px' }}>
    <img
      className="card-img-top"
      src="http://localhost:8081/images/Onboard_Images/owner.jpg"
      alt="Owner....."
      style={{
        width: '500px',
        height: '400px',
        objectFit: 'contain',
        
        // Add border style here
      }}
    />
    <div className="card-body">
     
    
      <div className="text-center mb-3 p-3">
        <a href="http://localhost:3000/owner/login" target="_self">
          <Button
            type="submit"
            variant="outline-dark"
            size="lg"
            onClick={() => setOwner_Clicked(true)}
          >
            Owner
          </Button>
        </a>
      </div>
    </div>
  </div>
</div>



        </div>
      </div>
      
      <div className="mt-auto">
     

      <MDBFooter
      className="text-center text-white"
      style={{ backgroundColor: "#0d987d" }} // Change background color
    >
      <div
        className="d-flex justify-content-center p-2"
        style={{
          borderBottomLeftRadius: "0.5rem",
          borderBottomRightRadius: "0.5rem",
          borderTop: "none",
        }}
      >
        <span className="text-white">
          © 2023 Copyright:{" "}
          <span
            className="text-white"
            onClick={() => (window.location.href = "/")}
            style={{ cursor: "pointer", fontWeight: "bold" }}
            title="Go Back"
          >
            UniAccomodations
          </span>
        </span>
      </div>

      <div className="p-3">
        {/* Demo Contact Details */}
        <p className="mb-0 text-white">{demoContactDetails}</p> {/* Add text-white class here */}

        {/* Demo Address */}
        <p className="text-white">{demoAddress}</p> {/* Add text-white class here */}
      </div>

      <div className="mb-3 p-3">
        <a href="http://localhost:3000/admin/login" target="_self">
          <Button
            type="submit"
            variant="outline-dark"
            size="lg"
            onClick={() => setStudent_Clicked(true)}
          >
            Admin
          </Button>
        </a>
      </div>
      
    </MDBFooter>



      </div>
      
    </div>
    
  );


  
}



export default OnBoardPage;
