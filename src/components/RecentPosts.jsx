import React, { useState, useEffect } from 'react';
import { Box, Grid, CircularProgress, Typography } from '@mui/material';
import service from '../appwrite/config';
import PostCard from './PostCard';
import { Query } from 'appwrite';

const RecentPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await service.getPosts([
          Query.equal("status", "active"),
          Query.limit(4),
          Query.orderDesc('$createdAt'),
        ]);
        setPosts(response.documents);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, py: 4 }}>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={post.$id}>
              <PostCard
                $id={post.$id}
                title={post.title}
                featuredImage={post.featuredImage}
                content={post.content}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default RecentPosts;
