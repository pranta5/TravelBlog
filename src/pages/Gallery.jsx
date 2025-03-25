
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Paper,
  Button,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import service from "../appwrite/config";

const PAGE_SIZE = 10; // Number of images per page

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); // Initial loading state
  const [loadingMore, setLoadingMore] = useState(false); // Load More state
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch images with pagination
  const fetchImages = async (pageNum) => {
    if (pageNum === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const imageList = await service.getAllImages(pageNum, PAGE_SIZE);
      setImages((prev) => [...prev, ...imageList]);
      setHasMore(imageList.length === PAGE_SIZE);
    } catch (error) {
      console.error("Error loading images:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Image Gallery
      </Typography>

      {/* Show full-screen loader when first fetching images */}
      {loading && page === 1 ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress size={50} />
        </Box>
      ) : images.length > 0 ? (
        <>
          <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
            {images.map((image) => (
              <Paper
                key={image.id}
                elevation={3}
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  "&:hover": {
                    transform: "scale(1.02)",
                    transition: "transform 0.2s ease-in-out",
                  },
                }}
              >
                <img
                  src={image.preview}
                  alt={image.name}
                  style={{
                    width: "100%",
                    display: "block",
                    borderRadius: "8px",
                  }}
                  loading="lazy"
                />
              </Paper>
            ))}
          </Masonry>

          {hasMore && (
            <Box display="flex" justifyContent="center" my={4}>
              <Button
                variant="contained"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={loadingMore}
              >
                {loadingMore ? <CircularProgress size={24} /> : "Load More"}
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Typography textAlign="center" color="text.secondary">
          No images found in the storage.
        </Typography>
      )}
    </Container>
  );
};

export default Gallery;
