import React from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const StickyButton = () => {
  const authStatus = useSelector((state) => state.auth.status);

  return (
    <Box sx={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      <Button
        component={Link}
        to={"/request"} // Redirects to login if not authenticated
        variant="contained"
        sx={{
          backgroundColor: authStatus ? "#21a85c" : "#f44336", // Green if logged in, Red if not
          transform: "scale(1)",
          transformOrigin: "left center",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Default shadow
          "&:hover": {
            backgroundColor: authStatus ? "#3ac978" : "#d32f2f",
            transform: "scale(1.1)",
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.4)", // Stronger shadow on hover
          },
        }}
      >
        {authStatus ? "Request to Write" : "Login for Write"}
      </Button>
    </Box>
  );
};

export default StickyButton;
