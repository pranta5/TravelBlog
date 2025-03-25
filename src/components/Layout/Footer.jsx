import React from "react";
import { Box, Container, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ backgroundColor: "#5b5e45", color: "#fff", py: 3, mt: 5 }}
    >
      <Container>
        {/* Social Media Section */}
        <Box display="flex" justifyContent="center" gap={2} pb={2}>
          <IconButton
            component={Link}
            to="https://facebook.com"
            target="_blank"
            sx={{ color: "white" }}
          >
            <Facebook />
          </IconButton>
          <IconButton
            component={Link}
            to="https://twitter.com"
            target="_blank"
            sx={{ color: "white" }}
          >
            <Twitter />
          </IconButton>
          <IconButton
            component={Link}
            to="https://instagram.com"
            target="_blank"
            sx={{ color: "white" }}
          >
            <Instagram />
          </IconButton>
          <IconButton
            component={Link}
            to="https://linkedin.com"
            target="_blank"
            sx={{ color: "white" }}
          >
            <LinkedIn />
          </IconButton>
        </Box>

        {/* Footer Info Section */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          textAlign="center"
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} Diganta . All Rights Reserved.
          </Typography>
          <Typography variant="body2">
            <Link
              to="/privacypolicy"
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: 10,
              }}
            >
              Privacy Policy
            </Link>{" "}
            |
            <Link
              to="/termsOfservice"
              style={{ color: "white", textDecoration: "none", marginLeft: 10 }}
            >
              Terms of Service
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
