// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Select,
//   MenuItem,
//   Box,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import requestservice from "../appwrite/requestService";

// const RequestDetails = () => {
//   const [requests, setRequests] = useState([]);

//   // Fetch all requests
//   const getAllRequests = async () => {
//     try {
//       const users = await requestservice.getRequests();
//       setRequests(users || []);
//     } catch (error) {
//       console.error("Error fetching requests:", error);
//     }
//   };

//   useEffect(() => {
//     getAllRequests();
//   }, []);

//   // Update status in Appwrite and UI
//   const handleStatusUpdate = async (id, newStatus) => {
//     const updatedRequest = await requestservice.updateRequestStatus(
//       id,
//       newStatus
//     );
//     if (updatedRequest) {
//       setRequests((prevRequests) =>
//         prevRequests.map((request) =>
//           request.$id === id ? { ...request, status: newStatus } : request
//         )
//       );
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <TableContainer
//         component={Paper}
//         sx={{
//           maxWidth: 900,
//           margin: "auto",
//           mt: 5,
//           boxShadow: 3,
//           borderRadius: 2,
//           overflow: "hidden",
//         }}
//       >
//         <Typography
//           variant="h5"
//           sx={{
//             p: 2,
//             textAlign: "center",
//             backgroundColor: "#f5f5f5",
//             borderBottom: "1px solid #e0e0e0",
//           }}
//         >
//           Request Details
//         </Typography>
//         <Table>
//           <TableHead>
//             <TableRow
//               sx={{
//                 backgroundColor: "#fafafa",
//                 "& th": {
//                   fontWeight: "bold",
//                   color: "#333",
//                 },
//               }}
//             >
//               <TableCell>Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Experience</TableCell>
//               <TableCell>Status</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {requests.length > 0 ? (
//               requests.map((request) => (
//                 <TableRow
//                   key={request.$id}
//                   sx={{
//                     "&:hover": {
//                       backgroundColor: "#f5f5f5",
//                       transition: "background-color 0.2s ease-in-out",
//                       cursor: "pointer",
//                     },
//                   }}
//                 >
//                   <TableCell
//                     sx={{
//                       "&:hover": {
//                         color: "#1976d2",
//                         fontWeight: "bold",
//                       },
//                     }}
//                   >
//                     {request.name}
//                   </TableCell>
//                   <TableCell>{request.email}</TableCell>
//                   <TableCell>{request.experience}</TableCell>
//                   <TableCell>
//                     <FormControl>
//                       <Select
//                         value={request.status || ""}
//                         onChange={(e) =>
//                           handleStatusUpdate(request.$id, e.target.value)
//                         }
//                         displayEmpty
//                         size="small"
//                         sx={{
//                           minWidth: 120,
//                           "&:hover": {
//                             backgroundColor: "#e3f2fd",
//                           },
//                           "& .MuiSelect-select": {
//                             py: 0.5,
//                           },
//                         }}
//                       >
//                         <MenuItem value="Pending">
//                           <em
//                             style={{
//                               color: "#757575",
//                               "&:hover": { color: "#1976d2" },
//                             }}
//                           >
//                             Pending
//                           </em>
//                         </MenuItem>
//                         <MenuItem
//                           value="Accepted"
//                           sx={{
//                             "&:hover": {
//                               backgroundColor: "#e8f5e9",
//                               color: "#2e7d32",
//                             },
//                           }}
//                         >
//                           Accepted
//                         </MenuItem>
//                         <MenuItem
//                           value="Rejected"
//                           sx={{
//                             "&:hover": {
//                               backgroundColor: "#ffebee",
//                               color: "#c62828",
//                             },
//                           }}
//                         >
//                           Rejected
//                         </MenuItem>
//                       </Select>{" "}
//                     </FormControl>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={4}
//                   align="center"
//                   sx={{
//                     py: 3,
//                     color: "#757575",
//                     "&:hover": {
//                       backgroundColor: "#f5f5f5",
//                     },
//                   }}
//                 >
//                   No Requests Found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default RequestDetails;

import React, { useEffect, useState } from "react";
import requestservice from "../appwrite/requestService";
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

const RequestDetails = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getAllRequests = async () => {
    try {
      const data = await requestservice.getRequests();
      setRequests(data|| []);
      setFilteredRequests(data.documents || []); // Ensure filteredRequests updates
    } catch (error) {
      console.error("Error fetching requests:", error);
      setRequests([]);
      setFilteredRequests([]);
    } finally {
      setLoading(false); // ✅ Stop loading after data fetch completes
    }
  };

  useEffect(() => {
    getAllRequests();
  }, []);
console.log("requests",requests);

  useEffect(() => {
    if (!Array.isArray(requests) || loading) return; // ✅ Avoid filtering before data loads
    const filtered = requests.filter((request) =>
      Object.values(request).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredRequests(filtered);
  }, [searchTerm, requests, loading]);

  const handleSort = (property) => () => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    const aValue = a[orderBy] || "";
    const bValue = b[orderBy] || "";
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
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  const paginatedRequests = sortedRequests.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Request Details
      </Typography>

      <Box display="flex" justifyContent="center" mb={2}>
        <TextField
          label="Search Requests"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {["name", "email", "experience", "status"].map((column) => (
                <TableCell key={column}>
                  <TableSortLabel
                    active={orderBy === column}
                    direction={orderBy === column ? order : "asc"}
                    onClick={handleSort(column)}
                  >
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRequests.map((request) => (
              <TableRow key={request.$id}>
                <TableCell>{request.name}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{request.experience}</TableCell>
                <TableCell>
                  <Select
                    value={request.status || "Pending"}
                    onChange={(e) =>
                      requestservice.updateRequestStatus(request.$id, e.target.value)
                    }
                    size="small"
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Accepted">Accepted</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRequests.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default RequestDetails;
