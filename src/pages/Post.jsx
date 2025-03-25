import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config"; // Assuming this is your Appwrite service file
import parse from "html-react-parser";
import commentservice from "../appwrite/comments";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  TextField,
  Divider,
} from "@mui/material";
import RecentPosts from "../components/RecentPosts";

const Post = () => {
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null); // New state for author details
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { slug } = useParams();
  const navigate = useNavigate();

  // Get authentication state from Redux
  const auth = useSelector((state) => state.auth);
  const userData = auth?.userData?.userData;
  const isLoggedIn = auth?.status;

  console.log("auth in post", auth);

  // Dynamically compute if the logged-in user is the author
  const isAuthor = useMemo(() => {
    return post && userData ? post.userId === userData.$id : false;
  }, [post, userData]);

  console.log("isAuthor", isAuthor);

  // Fetch post, comments, and author details
  useEffect(() => {
    if (slug) {
      // Fetch the post
      service
        .getPost(slug)
        .then((postData) => {
          if (postData) {
            setPost(postData);

            // Fetch author details using post.userId
            service
              .getUserById(postData.userId) // New service method (to be defined)
              .then((authorData) => {
                setAuthor(authorData || { name: "Anonymous" }); // Fallback to "Anonymous"
              })
              .catch((error) => {
                console.error("Error fetching author:", error);
                setAuthor({ name: "Anonymous" }); // Fallback on error
              });
          } else {
            console.log(`Post with slug ${slug} not found`);
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
          navigate("/");
        });

      // Fetch comments
      commentservice
        .getComments(slug)
        .then((commentsData) => {
          setComments(Array.isArray(commentsData) ? commentsData : []);
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
          setComments([]);
        });
    } else {
      navigate("/");
    }
  }, [slug, navigate,isLoggedIn,isAuthor]);

  // Refetch post and comments when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      service.getPost(slug).then(setPost);
      commentservice.getComments(slug).then(setComments);
    }
  }, [isLoggedIn, slug,isAuthor]);

  console.log("posts in post", post?.userId);

  // Delete post function
  const deletePost = () => {
    service
      .deletePost(slug)
      .then((status) => {
        if (status) {
          service.deleteFile(post.featuredImage);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !isLoggedIn) return;

    const commentData = {
      postId: slug,
      userId: userData.$id,
      username: userData.name || "Anonymous",
      content: newComment,
      createdAt: new Date().toISOString(),
    };

    try {
      const createdComment = await commentservice.createComment(commentData);
      setComments((prevComments) => [createdComment, ...prevComments]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return post ? (
    <Container sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
        {/* Post Image */}
        <Box position="relative" display="flex" justifyContent="center">
          <img
            src={service.getfilePreview(post.featuredImage)}
            alt={post.title}
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />

          {/* Edit/Delete Buttons (Only for Author) */}
          {isLoggedIn && isAuthor && (
            <Stack
              direction="row"
              spacing={2}
              position="absolute"
              top={16}
              right={16}
            >
              <Button
                variant="contained"
                color="success"
                component={Link}
                to={`/edit-post/${slug}`}
              >
                Edit
              </Button>
              <Button variant="contained" color="error" onClick={deletePost}>
                Delete
              </Button>
            </Stack>
          )}
        </Box>

        {/* Post Title and Author */}
        <Box my={3} textAlign="center">
          <Typography variant="h4" fontWeight="bold">
            {post.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            By {author?.name || "Loading..."} •{" "}
            {new Date(post.$createdAt).toDateString()}
          </Typography>
        </Box>

        {/* Post Content */}
        <Box
          sx={{
            backgroundColor: "#f9f9f9",
            padding: 3,
            borderRadius: "8px",
            lineHeight: 1.6,
          }}
        >
          {post.content ? parse(post.content) : "No content available"}
        </Box>

        {/* Comment Section */}
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Comments ({comments.length})
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {/* Comment Form (Only for Logged-in Users) */}
          {isLoggedIn ? (
            <Box component="form" onSubmit={handleCommentSubmit} mb={3}>
              <TextField
                fullWidth
                multiline
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment..."
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!newComment.trim()}
              >
                Post Comment
              </Button>
            </Box>
          ) : (
            <Typography sx={{ mb: 3 }}>
              Please{" "}
              <Link to="/login" style={{ color: "#1976d2" }}>
                login
              </Link>{" "}
              to post a comment.
            </Typography>
          )}

          {/* Display Comments */}
          {comments.length > 0 ? (
            comments.map((comment) =>
              comment ? (
                <Box key={comment.$id || Math.random()} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {comment.username || "Anonymous"}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {comment.createdAt
                      ? new Date(comment.createdAt).toLocaleString()
                      : "Just now"}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    {comment.content || "No content"}
                  </Typography>
                  <Divider sx={{ mt: 1 }} />
                </Box>
              ) : null
            )
          ) : (
            <Typography color="text.secondary">
              No comments yet. Be the first to comment!
            </Typography>
          )}
        </Box>

        {/* Recent Posts */}
        <Box>
          <Typography sx={{ textAlign: "center", fontFamily: "Times New Roman" }}>
            Recent Posts
          </Typography>
          <Divider sx={{ mt: 1 }} />
          <RecentPosts />
        </Box>
      </Paper>
    </Container>
  ) : null;
};

export default Post;