import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Hotel Management</title>
        <meta
          name="description"
          content="The page you are looking for could not be found."
        />
      </Helmet>

      <div className="not-found-page">
        <div className="not-found-container">
          <div className="not-found-code">404</div>

          <h1>Page Not Found</h1>

          <p>
            Oops
          </p>

          <Link to="/" className="back-home-btn">
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
