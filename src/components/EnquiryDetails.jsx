import React, { useEffect, useState } from "react";
import enquiryservice from "../appwrite/enquiry";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
  TextField,
  TableSortLabel,
  TablePagination,
} from "@mui/material";

const EnquiryDetails = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getEnquires = async () => {
    try {
      const data = await enquiryservice.getEnquiry();
      setEnquiries(data);
      setFilteredEnquiries(data.documents);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      setLoading(false);
    }
  };

  const updateEnquiryStatus = async (enquiryId, newStatus) => {
    try {
      await enquiryservice.updateEnquiry(enquiryId, { status: newStatus });
      setEnquiries((prev) => ({
        ...prev,
        documents: prev.documents.map((enquiry) =>
          enquiry.$id === enquiryId
            ? { ...enquiry, status: newStatus }
            : enquiry
        ),
      }));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    getEnquires();
  }, []);

  useEffect(() => {
    const filtered = enquiries.documents?.filter((enquiry) =>
      Object.values(enquiry).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredEnquiries(filtered || []);
    setPage(0);
  }, [searchTerm, enquiries]);

  const handleSort = (property) => () => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedEnquiries = [...filteredEnquiries].sort((a, b) => {
    const aValue = a[orderBy] || "";
    const bValue = b[orderBy] || "";
    if (orderBy === "$createdAt") {
      return order === "asc"
        ? new Date(aValue) - new Date(bValue)
        : new Date(bValue) - new Date(aValue);
    }
    return order === "asc"
      ? aValue.toString().localeCompare(bValue.toString())
      : bValue.toString().localeCompare(aValue.toString());
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  const paginatedEnquiries = sortedEnquiries.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2, md: 3 }, // Responsive padding
        maxWidth: "100%",
        minHeight: "100vh", // Full height
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        fontFamily="General Sans"
        sx={{
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, // Responsive font size
          color: "black",
          textAlign: "center",
        }}
      >
        All Enquiry
      </Typography>

      {/* Centered Search Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Center horizontally
          mb: 2,
        }}
      >
        <TextField
          label="Search Enquiries"
          variant="outlined"
          sx={{
            width: { xs: "100%", sm: "75%", md: "50%" }, // Responsive width
            maxWidth: "500px", // Cap max width
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#1976d2" }, // Blue border
              "&:hover fieldset": { borderColor: "#115293" },
              "&.Mui-focused fieldset": { borderColor: "#1976d2" },
            },
            "& .MuiInputLabel-root": {
              fontSize: { xs: "0.9rem", sm: "1rem" }, // Responsive label size
            },
            "& .MuiInputBase-input": {
              fontSize: { xs: "0.9rem", sm: "1rem" }, // Responsive input text
            },
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      {/* Table with Horizontal Slider */}
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#f9fafb",
          overflowX: { xs: "auto", sm: "hidden" }, // Scroll on small screens, no scroll on larger
          WebkitOverflowScrolling: "touch", // Smooth scrolling on mobile
          "&::-webkit-scrollbar": {
            height: "8px", // Scrollbar height
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#1976d2", // Blue scrollbar
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#e0e0e0", // Light gray track
          },
        }}
      >
        <Table
          sx={{
            width: { xs: "max-content", sm: "100%" }, // Wider than viewport on small screens
            minWidth: { xs: 800, sm: 650 }, // Ensure enough width to trigger scrolling on xs
            "& .MuiTableCell-root": {
              py: { xs: 1, sm: 1.5, md: 2 }, // Responsive vertical padding
              px: { xs: 0.5, sm: 1, md: 2 }, // Responsive horizontal padding
              whiteSpace: { xs: "nowrap", sm: "normal" }, // Prevent wrapping on small screens
            },
          }}
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
              {[
                { id: "name", label: "Name" },
                { id: "email", label: "Email" },
                { id: "phone", label: "Phone" },
                { id: "subject", label: "Subject" },
                { id: "message", label: "Message" },
                { id: "$createdAt", label: "Date" },
                { id: "status", label: "Status" },
              ].map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sx={{
                    fontWeight: "bold",
                    color: "#1976d2",
                    fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                  }}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={handleSort(headCell.id)}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEnquiries.map((enquiry, index) => (
              <TableRow
                key={enquiry.$id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f1f5f9",
                  "&:hover": { backgroundColor: "#e0f7fa" },
                }}
              >
                <TableCell sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem" } }}>
                  {enquiry.name}
                </TableCell>
                <TableCell sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem" } }}>
                  {enquiry.email}
                </TableCell>
                <TableCell sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem" } }}>
                  {enquiry.phone}
                </TableCell>
                <TableCell sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem" } }}>
                  {enquiry.subject || ""}
                </TableCell>
                <TableCell sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem" } }}>
                  {enquiry.message}
                </TableCell>
                <TableCell sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem" } }}>
                  {new Date(enquiry.$createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Select
                    value={enquiry.status || "Not Yet"}
                    onChange={(e) =>
                      updateEnquiryStatus(enquiry.$id, e.target.value)
                    }
                    size="small"
                    sx={{
                      minWidth: { xs: 80, sm: 100 },
                      fontSize: { xs: "0.7rem", sm: "0.875rem" },
                      backgroundColor:
                        enquiry.status === "Solved" ? "#e6ffe6" : "#fff3e0",
                      color:
                        enquiry.status === "Solved" ? "#2e7d32" : "#ef6c00",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor:
                          enquiry.status === "Solved" ? "#4caf50" : "#fb8c00",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor:
                          enquiry.status === "Solved" ? "#388e3c" : "#f57c00",
                      },
                    }}
                  >
                    <MenuItem
                      value="Not Yet"
                      sx={{
                        fontSize: { xs: "0.7rem", sm: "0.875rem" },
                        color: "#ef6c00",
                      }}
                    >
                      Not Yet
                    </MenuItem>
                    <MenuItem
                      value="Solved"
                      sx={{
                        fontSize: { xs: "0.7rem", sm: "0.875rem" },
                        color: "#2e7d32",
                      }}
                    >
                      Solved
                    </MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredEnquiries.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          display: "flex",
          justifyContent: "center",
          "& .MuiTablePagination-toolbar": {
            flexWrap: "wrap",
            justifyContent: "center",
            py: { xs: 1, sm: 2 },
          },
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            {
              fontSize: { xs: "0.7rem", sm: "0.875rem" },
              color: "#1976d2",
            },
          "& .MuiTablePagination-actions": {
            "& .MuiIconButton-root": {
              color: "#1976d2",
            },
          },
        }}
      />
    </Box>
  );
};

export default EnquiryDetails;
