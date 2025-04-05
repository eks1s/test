import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "Main", icon: <HomeIcon />, to: "/" },
    { text: "About", icon: <InfoIcon />, to: "/about" },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    user && (
      <>
        <AppBar position="static">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Button variant="contained" color="info" onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {menuItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton component={Link} to={item.to}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          mt={2}
        >
          <Typography
            mr={2}
            gutterBottom
            sx={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}
          >
            Welcome, {user.email}!
          </Typography>
        </Box>
      </>
    )
  );
};

export default Sidebar;
