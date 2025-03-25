import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { useDispatch, useSelector } from "react-redux"; // Add useSelector
import { login as storeLogin } from "../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Container,
  Paper,
  Typography,
  Stack,
  Button,
  Snackbar,
} from "@mui/material";
import { Logo } from "./CompIndex";
import { InputComp } from "./CompIndex";

const LoginComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData); // Monitor Redux state
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);




  async function handleLogin(data) {
    setLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(storeLogin(userData))
          setLoading(false);
        }
      }
      alert("login Successfull")
      setTimeout(() => {
        navigate("/");
      }, 100);
      // window.location.reload()
    } catch (error) {
      setLoading(false);
      console.log("error in login",error);
      
    }
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          width: "100%",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
          <Logo width="100" color={"black"} />
        </Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Sign in to your account
        </Typography>
        <Typography>
          Do not have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "primary.main",
              textDecoration: "none",
              fontWeight: "medium",
            }}
          >
            Signup
          </Link>
        </Typography>

        <Box component="form" onSubmit={handleSubmit(handleLogin)} sx={{ mt: 4 }}>
          <Stack spacing={3}>
            <InputComp
              label="Email"
              type="email"
              placeholder="Enter your Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email address is not valid",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <InputComp
              label="Password"
              type="password"
              placeholder="Enter your Password"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button type="submit" fullWidth disabled={loading} variant="outlined" sx={{"&:hover":{backgroundColor:"grey.200"}}}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginComp;
