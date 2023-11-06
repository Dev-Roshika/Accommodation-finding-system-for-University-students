import React from "react";
import { useEffect } from "react";

function SendMeMessage() {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        marginTop: "200px",
        marginBottom: "200px",
      }}
    >
      <div
        className="bg-secondary bg-gradient rounded shadow-sm bg-opacity-10"
        style={{ width: "50%" }}
      >
        <form action="" >
          <div
            className="d-flex justify-content-center flex-column bg-secondary bg-gradient p-5 bg-opacity-50"
            style={{
              borderTopLeftRadius: "0.5rem",
              borderTopRightRadius: "0.5rem",
              borderBottom: "none",
            }}
          >
            <h1
              className="text-center text-white"
              style={{ fontWeight: "bold" }}
            >
              Send Me a Message
            </h1>
            <h5 className="text-center text-secondary">
              Tell me what you need to tell the owner
            </h5>
          </div>
          <div className="p-5">
            <div className="mb-3">
              {/* Send Me a message */}
              <div className="col-sm">
                <input
                  name="paddress"
                  type="text"
                  required
                  className="form-control rounded-0"
                  
                />
                {/* <Link
                  to="/owner/login"
                  className="btn btn-default border w-100 bg-light rounded-0 mb-3"
                  style={{ color: "#0d987d" }}
                >
                  <strong>Send Me a Message</strong>
                </Link> */}
              </div>
            </div>
          </div>
        </form>
        <div
          className="d-flex justify-content-center bg-secondary bg-gradient p-2"
          style={{
            borderBottomLeftRadius: "0.5rem",
            borderBottomRightRadius: "0.5rem",
            borderTop: "none",
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
      </div>
    </div>
  );
}

export default SendMeMessage;
