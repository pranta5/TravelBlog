import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import PostCard from "../components/PostCard";
import { Query } from "appwrite";

const POSTS_PER_PAGE = 8;

const Blog = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  const fetchPosts = async (currentPage, query = "") => {
    setLoading(true);
    const offset = (currentPage - 1) * POSTS_PER_PAGE;
    const queries = [
      Query.equal("status", "active"),
      Query.limit(POSTS_PER_PAGE),
      Query.offset(offset),
    ];

    if (query) {
      queries.push(Query.search("title", query));
      queries.push(Query.search("content", query));
    }

    try {
      const response = await service.getPosts(queries);
      const fetchedPosts = response.documents;
      setAllPosts(fetchedPosts);
      applySorting(fetchedPosts, sortBy); // Only sort, no client-side filtering
      setTotalPages(Math.ceil(response.total / POSTS_PER_PAGE));
    } catch (error) {
      console.error("Error fetching posts:", error);
      setAllPosts([]);
      setDisplayedPosts([]);
      setTotalPages(1);
    }
    setLoading(false);
  };

  const applySorting = (posts, sortOption) => {
    let sortedPosts = [...posts];

    switch (sortOption) {
      case "title-asc":
        sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        sortedPosts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "date-asc":
        sortedPosts.sort(
          (a, b) => new Date(a.$createdAt) - new Date(b.$createdAt)
        );
        break;
      case "date-desc":
        sortedPosts.sort(
          (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
        );
        break;
      default:
        break;
    }

    setDisplayedPosts(sortedPosts);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      fetchPosts(1);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page on search
    fetchPosts(1, searchQuery); // Fetch with server-side search
  };

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    applySorting(allPosts, newSortBy);
  };

  useEffect(() => {
    fetchPosts(page, searchQuery);
  }, [page]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, minHeight: "80vh" }}>
      <Typography variant="h6" color="warning" mb={2}>* It's possible that images are not displaying due to changes in Appwrite's policies regarding free user access for Image transformations (starting April 1st, 2025).</Typography>
      {/* Search and Sort Controls */}
      <Box sx={{ mb: 4 }}>
        <Box
          component="form"
          onSubmit={handleSearchSubmit}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ width: { xs: "100%", sm: "auto" }, maxWidth: 400 }}
          />
          <Button
            type="submit"
            variant="contained"
            size="small"
            sx={{ backgroundColor: "#36d17b", px: 3 }}
          >
            Search
          </Button>
        </Box>

        <FormControl component="fieldset">
          <FormLabel component="legend">Sort By</FormLabel>
          <RadioGroup
            row
            value={sortBy}
            onChange={handleSortChange}
            name="sort-by-group"
          >
            <FormControlLabel
              value="date-desc"
              control={<Radio />}
              label="Newest First"
            />
            <FormControlLabel
              value="date-asc"
              control={<Radio />}
              label="Oldest First"
            />
            <FormControlLabel
              value="title-asc"
              control={<Radio />}
              label="Title A-Z"
            />
            <FormControlLabel
              value="title-desc"
              control={<Radio />}
              label="Title Z-A"
            />
          </RadioGroup>
        </FormControl>
      </Box>

      {displayedPosts.length === 0 ? (
        <Typography
          variant="h5"
          fontWeight="bold"
          color="textSecondary"
          textAlign="center"
        >
          No posts found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {displayedPosts.map((post) => (
            <Grid item key={post.$id} xs={12} sm={6} md={4} lg={3}>
              <PostCard {...post} />
              {/* {console.log("posts......",post)} */}
              
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4} gap={2}>
          <Button
            variant="outlined"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          <Typography fontFamily="Akzentica4F">{`Page ${page} of ${totalPages}`}</Typography>
          <Button
            variant="outlined"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Blog;
