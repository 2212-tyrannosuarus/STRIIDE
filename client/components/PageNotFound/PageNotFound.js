import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

export const PageNotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 Not Found</h1>
      <p className="not-found-message">
        Oops! The page you requested could not be found.
      </p>
      <Link to="/home">
        <button className="not-found-button">RETURN HOME</button>
      </Link>
    </div>
  );
};

export default PageNotFound;
