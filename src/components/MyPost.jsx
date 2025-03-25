import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import service from "../appwrite/config";
import parse from "html-react-parser";
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  CircularProgress,
  Pagination,
  useMediaQuery,
} from "@mui/material";
import { Query } from "appwrite";
import { Link } from "react-router-dom";

const truncateText = (text, maxLength) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const MyPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 5;
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const userData = useSelector((state) => state.auth.userData);
  const userId = userData?.userData?.$id;

  useEffect(() => {
    if (!userId) return;

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const Response = await service.getPosts([Query.equal("userId", userId)]);
        setTotalPosts(Response.total);

        const response = await service.getPosts([
          Query.equal("userId", userId),
          Query.limit(postsPerPage),
          Query.offset((page - 1) * postsPerPage),
        ]);
        console.log("response in my post ",response.documents)
        setPosts(response.documents);

      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId, page]);

  const totalPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "80vh" }}>
      <Typography textAlign="center" fontFamily="General Sans" fontSize="26px" fontWeight="300" mb={3}>
        My Posts
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" flexGrow={1}>
          <CircularProgress />
        </Box>
      ) : posts.length > 0 ? (
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {posts.map((post) => (
            <Link to={`/post/${post.$id}`} style={{ textDecoration: "none" }} key={post.$id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: isSmallScreen ? "column" : "row",
                  alignItems: "center",
                  "&:hover": { boxShadow: 6 },
                  maxWidth: "100%",
                }}
              >
                {/* Image Placeholder (If your posts have images, replace with actual URL) */}
                <CardMedia
                  component="img"
                  image={service.getfilePreview(`${post.featuredImage}`)}
                  alt="Post Thumbnail"
                  sx={{
                    width: isSmallScreen ? "100%" : 150,
                    height: isSmallScreen ? 150 : "100%",
                    objectFit: "cover",
                    p:2,
                    borderRadius:"20px"
                  }}
                />

                <CardActionArea sx={{ flex: 1 }}>
                  <CardContent>
                    <Typography color={post.status==="inactive"?"red":"green"}>{post.status.toUpperCase()}</Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {parse(truncateText(post.content,100))}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          ))}
        </Box>
      ) : (
        <Typography textAlign="center" flexGrow={1}>
          No posts found.
        </Typography>
      )}

      {/* Pagination - Fixed at Bottom */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt:5 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            siblingCount={1}
            boundaryCount={1}
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
};

export default MyPost;
