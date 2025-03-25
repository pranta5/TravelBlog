import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { Profile, MyPost, EnquiryDetails } from "../../components/CompIndex";
import { Menu as MenuIcon, AccountCircle, Article, QuestionAnswer } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import RequestDetails from "../../components/RequestDetails";
import AttractionsIcon from '@mui/icons-material/Attractions';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md")); // Check for small screens

  const userData = useSelector((state) => state.auth.userData);
  const isAdmin = userData?.userData?.labels?.includes("admin") || false;

  console.log("data on profile", userData?.userData);
  

  const menuItems = [
    { label: "Profile", key: "profile", icon: <AccountCircle /> },
    { label: "My Posts", key: "mypost", icon: <Article /> },
    ...(isAdmin ? [{ label: "Enquiry", key: "enquiry", icon: <QuestionAnswer /> }] : []),
    ...(isAdmin ? [{ label: "Request", key: "request", icon: < AttractionsIcon/> }] : []),
  ];

  return (
    <Box display="flex" minHeight="100vh"> 
      {/* Sidebar - Responsive */}
      <Paper
        sx={{
          width: isSmallScreen ? 70 : 180,
          bgcolor: "#727D73",
          color: "white",
          p: 2,
          transition: "width 0.3s",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
          {isSmallScreen ? <MenuIcon /> : "Dashboard"}
        </Typography>

        <List>
          {menuItems.map((item) => (
            <ListItem disablePadding key={item.key}>
              <ListItemButton
                sx={{
                  borderRadius: 2,
                  "&:hover": { bgcolor: "#AAB99A" },
                  bgcolor: activeTab === item.key ? "#D0DDD0" : "transparent",
                  justifyContent: isSmallScreen ? "center" : "flex-start",
                }}
                onClick={() => setActiveTab(item.key)}
              >
                <IconButton sx={{ color: "white"}}>{item.icon}</IconButton>
                {!isSmallScreen && <ListItemText primary={item.label} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Content Area - Fully Responsive */}
      <Box flex={1} p={4}>
        {activeTab === "profile" && <Profile />}
        {activeTab === "mypost" && <MyPost />}
        {activeTab === "enquiry" && isAdmin && <EnquiryDetails />}
        {activeTab === "request" && isAdmin && <RequestDetails />}
      </Box>
    </Box>
  );
};

export default Dashboard;
