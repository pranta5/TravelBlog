import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import formimg1 from "../assets/form img/formimg1.jpg";
import officeimg from "../assets/form img/contact2.jpg";
import { motion } from "framer-motion";
import { LocationOn, Email, Phone } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import contact1 from "../assets/contactImage/contact1.jpg";
import enquiryservice from "../appwrite/enquiry";

const ContactUs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data) {
      try {
        setIsLoading(true);
        const res = await enquiryservice.addEnquiry(data);
        console.log("enquiry res", res);
        setSubmitSuccess(true);
        reset();
        setSubmitError("");
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmitError("Failed to submit form. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Container maxWidth="lg">
      {/* Section 1: Hero Image with Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Box
          sx={{
            position: "relative",
            height: "200px",
            backgroundImage: `url(${contact1})`,
            backgroundSize: "cover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#f9c07a",
            textAlign: "center",
            p: 3,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Contact Us
          </Typography>
        </Box>
      </motion.div>

      {/* Section 2: Map & Office Address */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Box sx={{ p: 4 }}>
          <Grid container spacing={4} alignItems="stretch">
            <Grid item xs={12} md={6}>
              <Paper
                elevation={5}
                sx={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                <iframe
                  title="office-location"
                  src="https://maps.google.com/maps?q=webskitter&t=&z=12&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="300px"
                  style={{ border: "none", borderRadius: "8px" }}
                  allowFullScreen
                ></iframe>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} textAlign="center">
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: "12px",
                  backgroundImage: `url(${officeimg})`,
                  backgroundPosition: "center",
                  height: "300px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  color: "black",
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  fontWeight="bold"
                  color="inherit"
                >
                  Our Office
                </Typography>
                <Typography
                  variant="body1"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={1}
                >
                  <LocationOn sx={{ color: "black" }} /> 123 Main Street,
                  Kolkata, WB 700106
                </Typography>
                <Typography
                  variant="body1"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={1}
                >
                  <Email sx={{ color: "black" }} /> contact@company.com
                </Typography>
                <Typography
                  variant="body1"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={1}
                >
                  <Phone sx={{ color: "black" }} /> +1 234 567 890
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </motion.div>

      {/* Section 3: Contact Us Form */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Box
          sx={{
            p: 3,
            backgroundColor: "#f5f5f5",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            maxWidth: "600px",
            margin: "0 auto",
            backgroundImage: `url(${formimg1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            textAlign="center"
            color="#443627"
            fontWeight="bold"
          >
            Get in Touch
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Name"
                  {...register("name", { required: true })}
                  error={!!errors.name}
                  helperText={errors.name && "Name is required"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  type="email"
                  label="Email"
                  {...register("email", { required: true })}
                  error={!!errors.email}
                  helperText={errors.email && "Email is required"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Phone"
                  {...register("phone", { required: true })}
                  error={!!errors.phone}
                  helperText={errors.phone && "Phone number is required"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Subject"
                  {...register("subject")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  multiline
                  rows={3}
                  label="Message"
                  {...register("message", { required: true })}
                  error={!!errors.message}
                  helperText={errors.message && "Message is required"}
                />
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Button
                  variant="contained"
                  color="#443627"
                  size="medium"
                  type="submit"
                  disabled={isLoading}
                  sx={{ borderRadius: "8px", px: 4 }}
                >
                  {isLoading ? "Submitting..." : "Send Message"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </motion.div>

      {/* Success Alert */}
      <Snackbar
        open={submitSuccess}
        autoHideDuration={4000}
        onClose={() => setSubmitSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSubmitSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Form submitted successfully!
        </Alert>
      </Snackbar>

      {/* Error Alert */}
      <Snackbar
        open={!!submitError}
        autoHideDuration={4000}
        onClose={() => setSubmitError("")}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSubmitError("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {submitError}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ContactUs;
