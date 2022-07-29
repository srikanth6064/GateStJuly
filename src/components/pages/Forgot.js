import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./forgot.css";
import { userManagement } from "../../api/Api";

export default class ForgotPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      oldPassword: "",
      password: "",
      confirmPassword: "",
      match: null,
      charNumberValid: false,
      specialCharValid: false,
      uppercaseValid: false,
      numberValid: false,
    };
  }
  checkPasswordLength = (password) => {
    if (password.length >= 8) {
      this.setState({
        charNumberValid: true,
      });
    } else {
      this.setState({
        charNumberValid: false,
      });
    }
  };
  checkSpecialCharacters = (password) => {
    const pattern = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
    if (pattern.test(password)) {
      this.setState({
        specialCharValid: true,
      });
    } else {
      this.setState({
        specialCharValid: false,
      });
    }
  };
  checkUppercase = (password) => {
    const pattern = /[A-Z]/;
    if (pattern.test(password)) {
      this.setState({
        uppercaseValid: true,
      });
    } else {
      this.setState({
        uppercaseValid: false,
      });
    }
  };

  // Check for a number
  checkNumber = (password) => {
    const pattern = /[0-9]/;
    if (pattern.test(password)) {
      this.setState({
        numberValid: true,
      });
    } else {
      this.setState({
        numberValid: false,
      });
    }
  };

  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
    this.checkPasswordLength(event.target.value);
    this.checkSpecialCharacters(event.target.value);
    this.checkUppercase(event.target.value);
    this.checkNumber(event.target.value);
  };

  handleoldPasswordChange = (event) => {
    this.setState({
      oldPassword: event.target.value,
    });
  };

  handleConfirmPasswordChange = (event) => {
    this.setState({
      confirmPassword: event.target.value,
      match: null,
    });
  };

  comparePassword = (event) => {
    if (this.state.password === this.state.confirmPassword) {
      this.setState({
        match: true,
      });
    } else {
      this.setState({
        match: false,
      });
    }
  };

  resetForm = () => {
    this.setState({
      username: "",
      password: "",
      confirmPassword: "",
      match: null,
    });

    this.username.focus();
  };

  resetPassword = () => {
    console.log(this.state);
    if (
      !this.state.username ||
      !this.state.oldPassword ||
      !this.state.password ||
      !this.state.confirmPassword
    ) {
      alert("Please enter values in required * Fileds");
    }
    if (this.state.username && this.state.oldPassword && this.state.match) {
      const data = {
        type: "changePassword",
        userName: this.state.username,
        oldPassword: this.state.oldPassword,
        newPassword: this.state.password,
      };
      userManagement(data).then((res) => {
        this.setState({ success: res.data });
      });
    }
  };
  render() {
    return (
      <section className="account__container">
        <div className="input__container">
          <h1 style={{ color: "blue" }}>Forgot Password</h1>
          <label className="input__label">
            Username <span className="required">*</span>
          </label>
          <input
            className="input"
            ref={(input) => {
              this.username = input;
            }}
            value={this.state.username}
            onChange={(event) => this.handleUsernameChange(event)}
          />
        </div>
        <div className="password-container">
          <div className="password">
            <div className="input__container">
              <label className="input__label">
                Old Password <span className="required">*</span>
              </label>
              <input
                className="input"
                type="password"
                value={this.state.oldPassword}
                onChange={(event) => this.handleoldPasswordChange(event)}
              />
            </div>
            <div className="input__container">
              <label className="input__label">
                New Password <span className="required">*</span>
              </label>
              <input
                className="input"
                type="password"
                value={this.state.password}
                onChange={(event) => this.handlePasswordChange(event)}
              />
            </div>
            <div className="input__container">
              <label
                className={`input__label ${
                  this.state.match == false ? "error-msg" : null
                }`}
              >
                Confirm New Password <span className="required">*</span>
              </label>
              <input
                className={`input${this.state.match == false ? "--error" : ""}`}
                type="password"
                value={this.state.confirmPassword}
                onChange={(event) => this.handleConfirmPasswordChange(event)}
                onBlur={this.comparePassword}
              />
            </div>
          </div>
        </div>
        <div className="button__container">
          <button className="button--primary" onClick={this.resetPassword}>
            Change Password
          </button>
          <button className="button--secondary" onClick={this.resetForm}>
            Reset
          </button>
        </div>
        {this.state.success ? (
          <span>
            Password Changed <Link to="/">Click here for login</Link>
          </span>
        ) : (
          ""
        )}
      </section>
    );
  }
}
