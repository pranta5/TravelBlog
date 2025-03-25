import React from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Privacy Policy - Diganta Travels
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          Last updated: March 2025
        </Typography>

        <Box mt={3}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">1. Introduction</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Welcome to Diganta Travels! We respect your privacy and are committed to
                protecting your personal information.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">2. Information We Collect</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                We collect personal details such as your name, email, and travel
                preferences to enhance your experience.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">3. Security Measures</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                We implement strong security measures to protect your information.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            For queries, contact us at{" "}
            <a href="mailto:support@digantatravels.com">
              support@digantatravels.com
            </a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
