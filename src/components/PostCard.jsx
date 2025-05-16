import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import service from "../appwrite/config";
import parse from "html-react-parser";
import truncate from "html-truncate";

const truncateTitle = (titletext, maxLength) => {
  if (!titletext) return "";
  if (titletext.length <= maxLength) return titletext;
  return titletext.substring(0, maxLength) + "..";
};

const PostCard = ({ $id, title, featuredImage, content }) => {
  // Truncate content to 100 characters, preserving HTML structure
  // console.log("image...........",featuredImage);
  // console.log("image...........",service.getfilePreview(featuredImage));

  const truncatedContent = content ? truncate(content, 100) : "";

  return (
    <Link
      to={`/post/${$id}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <Card
        sx={{
          maxWidth: 460,
          borderRadius: 2,
          backgroundColor: "white",
          boxShadow: "0px 20px 50px #D9DBDF",
          transition: "all 0.3s ease",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          "&:hover": {
            transform: "translate(10px, -10px)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
          },
        }}
      >
        <CardMedia
          component="img"
          image={service.getfilePreview(featuredImage)}
          alt={title}
          sx={{
            width: "100%",
            height: 220,
            objectFit: "cover",
          }}
        />
        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: "Merriweather, serif",
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "left",
              mb: 1,
            }}
          >
            {truncateTitle(title, 18)}
          </Typography>
          <Typography
            variant="body2"
            component="div" // Use div to avoid <p> nesting
            sx={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: 14,
              color: "#555",
              lineHeight: "20px",
              textAlign: "justify",
              flexGrow: 1,
            }}
          >
            {parse(truncatedContent)} {/* Parse truncated HTML */}
          </Typography>
          <Button
            sx={{
              mt: 2,
              backgroundColor: "#3EDD84",
              color: "white",
              width: "fit-content",
              px: 3,
              py: 1,
              borderRadius: 1,
              textTransform: "none",
              fontSize: 14,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#34C978",
              },
            }}
          >
            Read More
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PostCard;
