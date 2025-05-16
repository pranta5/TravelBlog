import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const CardComp = ({ image, text, link }) => {
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          maxWidth: 350,
          margin: 2,
          mt: 8,
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: 3,
          },
        }}
      >
        <CardActionArea>
          <CardMedia component="img" height="250" image={image} alt={text} />
          <CardContent>
            <Typography
              fontFamily="Philosopher"
              fontWeight="400"
              gutterBottom
              variant="h5"
              component="div"
            >
              {text}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default CardComp;
