import { Box, Typography } from "@mui/material";
import React from "react";
import logoImageT from "../../assets/Logo/logo-transparent.png";
import { Link } from "react-router-dom";

const Logo = ({color}) => {
  return (
    <Link to="/" style={{ textDecoration: "none" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Box
          component="img"
          src={logoImageT}
          alt="Logo"
          sx={{
            height: "60px",
            width: "auto",
            cursor: "pointer",
            transform: "scale(1.5)",
            transformOrigin: "left center",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.6)",
            },
          }}
        />
        <Typography
          fontFamily="Lato"
          fontWeight="400"
          color={color}
          sx={{
            transform: "scale(1)",
            transformOrigin: "left center",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          Diganta Travel
        </Typography>
      </Box>
    </Link>
  );
};

export default Logo;
