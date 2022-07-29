import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { isAuthenticated } from "../Auth";

export function Button() {
  const history = useHistory();
  const location = useLocation();
  const logOut = () => {
    history.push("/");
    localStorage.removeItem("login");
  };
  return (
    <>
      {location.pathname === "/sign-up" || location.pathname === "/forgot" ? (
        <Link to={"/"}>
          <button className="btn">{"Log In"}</button>
        </Link>
      ) : (
        <Link to={location.state && location.state.login ? "/" : "/sign-up"}>
          <button onClick={logOut} className="btn">
            {(location.state && location.state.login) || isAuthenticated()
              ? "Log Out"
              : "Sign Up"}
          </button>
        </Link>
      )}
    </>
  );
}
