import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../redux/features/authSlice";
import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        alert("logout success")
        navigate("/")
      })
      .catch((err) => console.log("error while dispatch logout", err));
  };
  return (
    <Button
      onClick={logoutHandler}
      sx={{
        px:5,
        borderRadius: "999px",
        color:"#f1f5d1",
        bgcolor:"#821414",
        transform: "scale(.9)",
        transformOrigin: "left center",
        transition: "transform 0.3s ease",
        "&:hover": {
          backgroundColor: "#c11d1d",
          color:"#ffffff",
          transform: "scale(1)"
        },
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutBtn;
