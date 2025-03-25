import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector
import authService from "../src/appwrite/auth";
import { login, logout } from "../src/redux/features/authSlice";

import { Footer } from "../src/components/CompIndex";
import { Header } from "../src/components/CompIndex";
import { Link, Outlet } from "react-router-dom";
import { Box, Button, CircularProgress } from "@mui/material";
import StickyButton from "./components/StickyButton";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  
  // Get auth status from Redux
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => console.log("Auth error", err))
      .finally(() => setLoading(false));
  }, [dispatch,authStatus]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "grey.300" }}>
      <Header />
      <Box sx={{ py: 1 }}>
        <Outlet />
      </Box>
      {/* Only show StickyButton if the user is authenticated */}
      <StickyButton />
      <Footer />
    </Box>
  );
}

export default App;
