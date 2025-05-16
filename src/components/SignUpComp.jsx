import {
  Alert,
  Box,
  Button,
  colors,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputComp, Logo } from "./CompIndex";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import service from "../appwrite/config"; // Import your Service class
import { useDispatch } from "react-redux";
// import { login } from "../store/authSlice"; // Uncomment if needed

const SignUpComp = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const createHandler = async (data) => {
    setLoading(true);
    setSubmitError("");
    console.log("form data ", data);

    try {
      // Create the user account
      const userData = await authService.createAccount(data);
      console.log("create account", userData);

      if (userData) {
        // Create a profile document in the profiles collection
        await service.createProfile({
          userId: userData.$id, // Appwrite user ID
          name: data.name, // Name from the form (not userData.name, since it’s set via form)
        });
        setLoading(false);
      }
      alert("signup Completed");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.error("Error in createHandler:", error);
      setSubmitError(error.message);
    }
  };

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
        elevation={3}
        sx={{ padding: 4, width: "100%", borderRadius: 2, textAlign: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Logo color={"black"} width="100%" />
        </Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Sign up to create account
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, color: "text.secondary" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "primary.main" }}>
            Sign In
          </Link>
        </Typography>

        {submitError && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {submitError}
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit(createHandler)}
          sx={{ mt: 4 }}
        >
          <Stack spacing={3}>
            <InputComp
              label="Full Name"
              placeholder="Enter your full name"
              type="text"
              name="name"
              {...register("name", {
                required: "Full Name is required",
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <InputComp
              label="Email"
              placeholder="Enter your Email"
              type="email"
              name="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email address must be valid",
                },
              })}
              error={!!errors?.email}
              helperText={errors?.email?.message}
            />
            <InputComp
              label="Password"
              placeholder="Enter Password"
              type="password"
              name="password"
              {...register("password", {
                required: "Password is required",
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              type="submit"
              disabled={loading}
              fullWidth
              variant="outlined"
              sx={{ "&:hover": { backgroundColor: "grey.200" } }}
            >
              {loading ? "Creating...." : "Create Account"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUpComp;
