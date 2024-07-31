import React, { useState } from "react";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  Close as CloseIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ManageAccounts,
  Group,
  Message,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useLocation, Link as LinkComponent, Navigate } from "react-router-dom";
import styled from "@emotion/styled";
import { matBlack } from "../../Constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../redux/thunks/admin";
 


const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
  ${({ isActive }) =>
    isActive &&
    `
    background-color: ${matBlack};
    color: white;
    &:hover {
      color: white;
    }
  `}
`;

const AdminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <ManageAccounts />,
  },
  {
    name: "Chats",
    path: "/admin/chats",
    icon: <Group />,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <Message />,
  },
];

const SideBar = ({ w = "100%" }) => {
  const location = useLocation();
  const dispatch = useDispatch()

  const logoutHandler = () => {
    console.log("logout");
    dispatch(adminLogout())
  };

  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant="h4" textTransform={"uppercase"}>
        Admin
      </Typography>
      <Stack spacing={"1rem"}>
        {AdminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            active={location.pathname === tab.path ? 1 : 0}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {tab.icon}
              <Typography>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}
        <Link onClick={logoutHandler}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <ExitToAppIcon />
            <Typography>LogOut</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const {isAdmin} = useSelector((state)=>state.auth)
  const handleMobile = () => {
    setIsMobile((isMobile) => !isMobile);
  };
  const handleClose = () => setIsMobile(false);
  if(!isAdmin) return <Navigate to="/admin"/>
  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
        <SideBar />
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        sx={{
          bgcolor: "#f5f5f5",
        }}
      >
        {children}
      </Grid>

      <Drawer open={isMobile} onClose={handleClose} >
        <SideBar w={"50vw"} />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
