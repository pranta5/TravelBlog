import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";

import { motion } from "motion/react";
import StarIcon from '@mui/icons-material/Star';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import video1 from "../assets/video/hero.mp4";
import { CardComp } from "../components/CompIndex";

import cardImg1 from '../assets/image header/imageheader.jpg'
import cardImg2 from '../assets/image header/imageheader2.jpg'
import cardImg3 from '../assets/image header/imageheader3.jpg'
import cardImg4 from '../assets/image header/imageheader4.jpg'
import cardImg5 from '../assets/image header/imageheader5.jpg'
import { Link } from "react-router-dom";
import RecentPosts from "../components/RecentPosts";
import BoltIcon from '@mui/icons-material/Bolt';
import ShieldIcon from '@mui/icons-material/Shield';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import miniCard1 from '../assets/cardImage/card1.jpg'
import miniCard2 from '../assets/cardImage/card2.jpg'
import miniCard3 from '../assets/cardImage/card3.jpg'

const heroImages = [
  { src: cardImg1, alt: "Travel Adventure" },
  { src: cardImg2, alt: "Explore Nature" },
  { src: cardImg3, alt: "Discover Culture" },
  { src: cardImg4, alt: "Discover Culture" },
  { src: cardImg5, alt: "Discover Culture" },
];

const features = [
  {
    icon: <BoltIcon sx={{ fontSize: 40,color: "#4caf50" }} />,
    title: "Fast & Responsive",
    desc: "Optimized for speed and mobile-friendly.",
  },
  {
    icon: <CheckCircleOutlineIcon sx={{ fontSize: 40,color: "#4caf50" }} />,
    title: "Easy to Use",
    desc: "Intuitive design and simple navigation.",
  },
  {
    icon: <ShieldIcon sx={{ fontSize: 40,color: "#4caf50" }} />,
    title: "Secure & Reliable",
    desc: "Built with security and stability in mind.",
  },
];

const testimonials = [
  {
    name: "John Doe",
    text: "This service changed my workflow completely!",
    rating: 5,
  },
  {
    name: "Jane Smith",
    text: "Absolutely love the user experience.",
    rating: 5,
  },
  {
    name: "Sanex Doe",
    text: "Absolutely love the user experience.",
    rating: 5,
  },
];
const Home = () => {
  return (
    
    <Box
    sx={{ textAlign: "center" }}
  >
        {/* Hero Section  */}
        {/* <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "88vh",
            overflow: "hidden",
            margin: 0,
            padding: 0,
          }}
        >
          <video
            autoPlay
            loop
            muted
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
            }}
          >
            <source src={video1} type="video/mp4" />
          </video>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                fontFamily="futura-pt-book"
                fontWeight="700"
                sx={{
                  fontSize: { xs: "2rem", md: "3rem" },
                  textAlign: "center",
                }}
                gutterBottom
              >
                EXPLORE. DREAM. DISCOVER.
              </Typography>
              <Typography fontFamily="Open Sans" fontWeight="400" gutterBottom>
                This is a world travel blog featuring beautiful destinations,
                new experiences, and hidden places around the globe.
              </Typography>
              <Button 
                variant="outlined"
                color="white"
                component={Link}
                  to="/blog"
                sx={{
                  mt: 2,
                  fontSize: { xs: "0.8rem", md: "1rem" },
                  padding: { xs: "6px 12px", md: "10px 20px" },
                }}
              >
                Start Exploring
              </Button>
            </motion.div>
          </Box>
        </Box> */}
              <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "88vh",
          overflow: "hidden",
        }}
      >
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={4000}
          showStatus={false}
        >
          {heroImages.map((image, index) => (
            <Box key={index} sx={{ height: "88vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img
                src={image.src}
                alt={image.alt}
                style={{ width: "100vw", height: "100%", objectFit: "cover" }}
              />
            </Box>
          ))}
        </Carousel>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography fontSize={{ xs: "2rem", md: "3rem" }} fontWeight="700">
              EXPLORE. DREAM. DISCOVER.
            </Typography>
            <Typography fontSize="1.2rem" fontWeight="400" gutterBottom>
              This is a world travel blog featuring beautiful destinations, new experiences, and hidden places around the globe.
            </Typography>
            <Button
              variant="outlined"
              color="inherit"
              component={Link}
              to="/blog"
              sx={{ mt: 2, fontSize: { xs: "0.8rem", md: "1rem" } }}
            >
              Start Exploring
            </Button>
          </motion.div>
        </Box>
      </Box>
              {/* Card */}
        <Box display="flex" alignItems="center" justifyContent="center" sx={{flexWrap:"wrap"}}>
          <CardComp link={"/blog"} image={miniCard1} text="Travel Blog"/>
          <CardComp link={"/about"} image={miniCard2} text="About us"/>
          <CardComp link={"/contactus"} image={miniCard3} text="Contact"/>
        </Box>

        {/* recent post  */}

        <Box> 
        <Typography variant="h4" fontFamily="Philosopher"  mb={2} mt={4}>
        Recent Posts
      </Typography>
          <RecentPosts/>
        </Box>
      

        {/* Features Section */}
        <Typography
          variant="h4"
          fontFamily="Philosopher"
          fontWeight="400"
          sx={{ marginTop: 4 }}
        >
          Why Choose us
        </Typography>

        <Box sx={{ p: 3 }}>
        <Grid container spacing={4} sx={{ marginTop:0}}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardContent sx={{ pt:4}}  >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "10px",
                    }}
                  >
                    {feature.icon}
                  </div>
                  <Typography variant="h5" fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography sx={{marginTop:"10px",marginBottom:"10px"}} variant="body2" color="textSecondary">
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        </Box>


        {/* Testimonials Section */}
        <Typography
          variant="h4"
          fontFamily="Philosopher"
          fontWeight="400"
          sx={{ marginTop: 6 }}
        >
          What Our Users Say
        </Typography>
        <Box sx={{ p: 3 }}>
        <Grid container spacing={5} sx={{ marginTop:0 }}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardContent sx={{ pt:4}}>
                  <Typography  variant="body1">"{testimonial.text}"</Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 6,
                    }}
                  >
                    {/* {[...Array(testimonial.rating)].map((_, i) => (
                  <StarBorderIcon key={i} style={{ color: "#ffb400" }} />
                ))} */}
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <StarIcon key={i} style={{ color: "#ffb400" }} />
                    ))}
                  </div>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    style={{ marginTop: "10px" }}
                  >
                    - {testimonial.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        </Box>

      </Box>
  );
};

export default Home;
