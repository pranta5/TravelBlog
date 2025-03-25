import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Paper, Typography } from "@mui/material";
import requestservice from "../appwrite/requestService";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const Data = useSelector((state) => state.auth.userData);
  const userData = Data?.userData;

  const [loading, setLoading] = useState(true);
  const [requestValue,setRequestValue]=useState({})

  useEffect(() => {
    setProfile(userData);
  }, [userData]);

  
  useEffect(()=>{
    const checkRequestStatus = async()=>{
      if(!userData){
        setLoading(false)
        return
      }
      try {
        const request = await requestservice.getRequestByEmail(userData?.email)
        setRequestValue(request)
        
      } catch (error) {
        console.error("error in checking status")
      }finally{
        setLoading(false)
      }
    }
    checkRequestStatus()
  },[userData])

  console.log("requestValue",requestValue);


  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
        maxWidth: { xs: "100%", sm: "600px" }, // Responsive width
        mx: "auto", // Center horizontally
        fontFamily: "'Poppins', sans-serif", // Custom font family
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          color: "black", // Blue title
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.2rem" }, // Responsive font size
          textAlign: { xs: "center", sm: "center" }, // Center on mobile
          fontFamily: "General Sans",
          
        }}
      >
        My Profile
      </Typography>

      {profile ? (
        <Paper
          elevation={4}
          sx={{
            p: { xs: 2, sm: 3 }, // Responsive padding
            borderRadius: 3,
            background: "linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)", // Gradient background
            border: "1px solid #e0e0e0",
            transition: "all 0.3s ease", // Smooth transition for hover
            "&:hover": {
              transform: "translateY(-5px)", // Lift effect
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)", // Enhanced shadow
              borderColor: "#1e88e5", // Blue border on hover
            },
            textAlign:"center"
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#424242", // Dark gray
              mb: 1.5,
              fontSize: { xs: "1.1rem", sm: "1.25rem" }, // Responsive font
              fontFamily: "inherit",
              transition: "color 0.3s ease",
              "&:hover": {
                color: "#1e88e5", // Blue on hover
              },
            }}
          >
            Name: {profile.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#616161", // Medium gray
              fontSize: { xs: "0.9rem", sm: "1rem" }, // Responsive font
              fontFamily: "inherit",
              transition: "color 0.3s ease",
              "&:hover": {
                color: "#1976d2", // Slightly darker blue on hover
              },
            }}
          >
            Email: {profile.email}
          </Typography>
          <Typography>
            Role : {profile.labels.length<1?"User":"Admin"}
          </Typography>
          <Typography>
            Request Status : {loading?"Loading...": requestValue?.status?requestValue?.status:" Create Request"} 
          </Typography>
        </Paper>
      ) : (
        <Typography
          sx={{
            color: "#757575", // Light gray
            fontStyle: "italic",
            textAlign: "center",
            fontFamily: "inherit",
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
        >
          Loading profile...
        </Typography>
      )}
    </Box>
  );
};

export default Profile;