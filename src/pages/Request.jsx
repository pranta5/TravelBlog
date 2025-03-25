import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { InputComp } from "../components/CompIndex";
import requestservice from "../appwrite/requestService";

const Request = () => {
  const navigate = useNavigate();
  const Data = useSelector((state) => state.auth?.userData?.userData);
  const userEmail = Data?.email;
  const name = Data?.name;

  const [hasRequested, setHasRequested] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Check if user already has a request
  useEffect(() => {
    const checkExistingRequest = async () => {
      try {
        const existingRequest = await requestservice.getRequestByEmail(
          userEmail
        );
        if (existingRequest) {
          setHasRequested(true);
        }
      } catch (error) {
        console.error("Error checking request:", error);
      } finally {
        setLoading(false);
      }
    };
    checkExistingRequest();
  }, [userEmail]);

  const onSubmit = async (data) => {
    try {
      await requestservice.createRequest(data);
      alert("Request submitted successfully!");
      navigate("/");
    } catch (error) {
      alert(error.message); // Show error if request already exists
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
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
          padding: 3,
          width: "100%",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{ fontFamily: "sans-serif", p: 5 }}
        >
          Request to Write Blog
        </Typography>

        {!userEmail ? (
          <Typography
            color="error"
            fontFamily="Trirong"
            fontSize="20px"
            sx={{ my: 2 }}
          >
            You need to <Link to="/login">login</Link> to create a request.
          </Typography>
        ) : hasRequested ? (
          <Typography color="error" sx={{ mt: 2 }}>
            You have already submitted a request.
          </Typography>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ maxWidth: 400, margin: "auto", mt: 4 }}
          >
            <Stack spacing={3}>
              <InputComp
                label="Name"
                value={name}
                disabled
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
              {errors.name && (
                <Typography color="error">{errors.name.message}</Typography>
              )}

              <InputComp
                label="Email"
                type="email"
                value={userEmail}
                disabled
                {...register("email")}
              />

              <InputComp
                label="Experience"
                type="text"
                {...register("experience", {
                  required: "Experience is required",
                  minLength: {
                    value: 2,
                    message: "Experience must be at least 2 characters",
                  },
                })}
              />
              {errors.experience && (
                <Typography color="error">
                  {errors.experience.message}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                disabled={hasRequested}
              >
                {hasRequested ? "Request Already Sent" : "Submit"}
              </Button>
            </Stack>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Request;
