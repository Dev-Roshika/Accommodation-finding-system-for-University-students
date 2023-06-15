import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";

function Footer() {
    return (
        <MDBFooter
            className="text-center text-white"
            style={{ backgroundColor: "#f1f1f1" }}
        >
            <div 
                className="d-flex justify-content-center p-2"
                style={{
                    borderBottomLeftRadius: "0.5rem",
                    borderBottomRightRadius: "0.5rem",
                    borderTop: "none",
                    backgroundColor: "#0d987d",
                }}
            >
                <span className="text-white">© 2023 Copyright:</span>&nbsp;
                <span
                    className="text-white"
                    onClick={() => (window.location.href = "/")}
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                    title="Go Back"
                >
                    {" "}
                    UniAccomodations{" "}
                </span>
            </div>
        </MDBFooter>
    );
}

export default Footer;
