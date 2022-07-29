import React, { useState } from "react";
import "../../App.css";
import lock from "../../images/pass.png";
import profile from "../../images/gatestone2.png";
import email from "../../images/abc.jpg";
import { userManagement } from "../../api/Api";
import { Link } from "react-router-dom";
export default function SignUp() {
  const [success, setSuccess] = useState(false);

  const registerUser = () => {
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    if (email && pass) {
      const data = {
        type: "registration",
        userName: email,
        password: pass,
      };
      userManagement(data).then((res) => {
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        setSuccess(res.data);
      });
    } else {
      alert("please choose user name and password");
    }
  };
  return (
    <div className="main">
      <div className="sub-main">
        <div>
          <div className="imgs">
            <div className="container-image">
              <img src={profile} alt="profile" className="profiles" />
            </div>
          </div>
          <div>
            <h1>User Registration</h1>
            <div>
              <img src={email} alt="email" className="email"></img>
              <input
                type="text"
                id="email"
                placeholder="user name"
                className="name"
              />
            </div>
            <div className="second-input">
              <img src={lock} alt="pass" className="email" />
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="name"
              />
            </div>
            <div className="login-button">
              <button className="button1" onClick={registerUser}>
                Sign Up
              </button>
            </div>
            {success ? (
              <span>
                User Registered <Link to="/">Click here for login</Link>
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
