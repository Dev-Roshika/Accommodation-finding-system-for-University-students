import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SendMeMessage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  axios.defaults.withCredentials = true;

  const [text, setText] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:8081")
      .then((res) => {
        if (res.data.Valid && (res.data.Role === "student" || res.data.Role === "owner")) {
          console.log(res.data.Role + " is a valid user");
          setUserData(res.data);
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  const sendEmail = async () => {
    try {
      const response = await axios.post('http://localhost:8081/send-email/68', {
        text,
      });

      if (response.status === 200) {
        alert('Email sent successfully');
      } else {
        alert('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

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
        <form>
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
              <div className="col-sm">
                <input
                  name="text"
                  type="text"
                  required
                  className="form-control rounded-0"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-default border bg-light rounded-0"
              style={{ color: "#0d987d" }}
              onClick={sendEmail}
            >
              <strong>Send Me a Message</strong>
            </button>
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
            UniAccommodations{" "}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SendMeMessage;
