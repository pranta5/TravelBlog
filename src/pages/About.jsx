import React from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import { motion } from "motion/react";
import about2 from "../assets/Image/about2.jpg";
import about3 from "../assets/Image/about3.jpg";
import about1 from "../assets/Image/about.jpg";

const About = () => {
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
            backgroundImage: `url(${about1})`,
            backgroundSize: "cover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#f8b89e",
            textAlign: "center",
            p: 3,
            borderRadius: "8px",
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            About Us
          </Typography>
        </Box>
      </motion.div>

      {/* Section 2: About Company with Image */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Box sx={{ p: 4 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <img
                src={about2}
                alt="About Company"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                About Our Company
              </Typography>
              <Typography variant="body1" color="text.secondary">
                We are dedicated to providing the best experience with
                cutting-edge technology and user-friendly design. Our mission is
                to innovate and excel in the tech industry.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </motion.div>

      {/* Section 3: Our Mission with Image */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Box sx={{ p: 4 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Our mission is to empower individuals and businesses by
                delivering high-quality, reliable, and innovative solutions that
                drive success and growth.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                src={about3}
                alt="Our Mission"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
};

export default About;
