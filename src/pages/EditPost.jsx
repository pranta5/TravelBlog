import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Box, CircularProgress, Container } from "@mui/material";
import PostForm from "../components/PostForm/PostForm";

const EditPost = () => {
  const [posts, setposts] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setposts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return (
    <Container sx={{ py: 4 }}>
      {posts ? (
        <PostForm post={posts} />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default EditPost;
