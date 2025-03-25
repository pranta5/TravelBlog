import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>
        Back to
        <Link to="/">
          <Button>Home</Button>
        </Link>
      </p>
    </div>
  );
};

export default Error404;
