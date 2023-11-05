import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";

function Footer() {
  // Demo contact details and address
  const demoContactDetails = "Contact: (123) 456-7890 | Email: demo@example.com";
  const demoAddress = "1234 Demo Street, Demo City, Demo Country";

  return (
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

      
      
    </MDBFooter>
    
  );
}

export default Footer;
