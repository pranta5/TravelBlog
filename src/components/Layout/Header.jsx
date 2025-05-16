import React, { useState } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Logo, LogoutBtn } from "../CompIndex";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/" },
    { name: "Blog", slug: "/blog" },
    { name: "Gallery", slug: "/gallery" },
    { name: "About", slug: "/about" },
    { name: "Contact", slug: "/contactus" },
  ];

  const authItems = [
    { name: "Login", slug: "/login", show: !authStatus },
    { name: "Signup", slug: "/signup", show: !authStatus },
    { name: "Add Post", slug: "/add-post", show: authStatus },
    { name: "Dashboard", slug: "/dashboard", show: authStatus },
  ];

  const renderNavItems = (items, onClick) =>
    items.map(
      (item) =>
        item.show !== false && (
          <ListItem key={item.slug} disablePadding>
            <ListItemButton
              component={Link}
              to={item.slug}
              onClick={onClick}
              sx={{
                pl: 4,
                borderRadius: "999px",
                backgroundColor:
                  location.pathname === item.slug ? "#f1f5d1" : "inherit",
                color: location.pathname === item.slug ? "#000" : "#fff",
                transform: "scale(.8)",
                transformOrigin: "left center",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(.88)",
                  borderRadius: "999px",
                  backgroundColor: "#818752",
                  color: "#ffffff",
                },
              }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        )
    );

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#5b5e45", width: "100%" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open navigation menu"
              onClick={() => setLeftDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Logo color={"white"} />

          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2, marginLeft: 3 }}>
              {navItems.map((item) => (
                <Button
                  key={item.slug}
                  component={Link}
                  to={item.slug}
                  sx={{
                    color: location.pathname === item.slug ? "#f1f5d1" : "#fff",
                    backgroundColor:
                      location.pathname === item.slug
                        ? "#ffffff20"
                        : "transparent",
                    transform: "scale(1)",
                    transformOrigin: "left center",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.1)",
                      backgroundColor: "#818752",
                      color: "#ffffff",
                    },
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          )}
        </Box>

        <IconButton
          edge="end"
          color="inherit"
          aria-label="open account menu"
          onClick={() => setRightDrawerOpen(true)}
        >
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>

      <Drawer
        anchor="left"
        open={leftDrawerOpen}
        onClose={() => setLeftDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 130,
            backgroundColor: "#2e2f23",
            color: "#fff",
          },
        }}
      >
        <List>{renderNavItems(navItems, () => setLeftDrawerOpen(false))}</List>
      </Drawer>

      <Drawer
        anchor="right"
        open={rightDrawerOpen}
        onClose={() => setRightDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 150,
            backgroundColor: "#3c3f2f",
            color: "#fff",
          },
        }}
      >
        <List>
          {renderNavItems(authItems, () => setRightDrawerOpen(false))}
          {authStatus && (
            <ListItem disablePadding>
              <ListItemButton onClick={() => setRightDrawerOpen(false)}>
                <LogoutBtn />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
