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

const TermsOfService = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Terms of Service - Diganta Travels
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          Last updated: March 2025
        </Typography>

        <Box mt={3}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">1. Acceptance of Terms</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                By using our services, you agree to these terms.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">2. User Responsibilities</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Users must comply with local laws and not misuse our platform.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">3. Governing Law</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                These terms are governed by the laws of your jurisdiction.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Box mt={3} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            Need help? Email us at{" "}
            <a href="mailto:support@digantatravels.com">
              support@digantatravels.com
            </a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default TermsOfService;
