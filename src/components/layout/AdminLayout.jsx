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
  ChatBubble as ChatBubbleIcon,
} from "@mui/icons-material";
import { useLocation, Link as LinkComponent, Navigate } from "react-router-dom";
import styled from "@emotion/styled";
import { myBlue } from "../../Constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../redux/thunks/admin";



const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 0.75rem;
  padding: 0.85rem 1.25rem;
  color: #68708b;
  font-weight: 600;
  transition: background-color 150ms ease, color 150ms ease;
  &:hover {
    background-color: rgba(55, 82, 217, 0.06);
    color: #161b33;
  }
  ${({ isActive }) =>
    isActive &&
    `
    background-color: ${myBlue};
    color: white;
    &:hover {
      background-color: ${myBlue};
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
    <Stack width={w} height={"100%"} direction={"column"} p={"2rem"} spacing={"2.5rem"} sx={{ bgcolor: "background.paper" }}>
      <Stack direction="row" alignItems="center" spacing={1.25}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ width: 40, height: 40, borderRadius: "10px", bgcolor: myBlue, color: "white" }}
        >
          <ChatBubbleIcon fontSize="small" />
        </Stack>
        <Typography variant="h6" fontWeight={700}>
          Admin
        </Typography>
      </Stack>
      <Stack spacing={"0.5rem"} flexGrow={1}>
        {AdminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            isActive={location.pathname === tab.path ? 1 : 0}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {tab.icon}
              <Typography fontWeight={"inherit"}>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}
      </Stack>
      <Link onClick={logoutHandler} to="#">
        <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} color="error.main">
          <ExitToAppIcon color="error" fontSize="small" />
          <Typography fontWeight={600} color="error.main">Logout</Typography>
        </Stack>
      </Link>
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
    <Grid container minHeight={"100vh"} sx={{ bgcolor: "background.default" }}>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
          zIndex: 1300,
          bgcolor: "background.paper",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(22,27,51,0.12)",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: { xs: "none", md: "block" },
          borderRight: "1px solid",
          borderColor: "divider",
        }}
      >
        <SideBar />
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        sx={{
          bgcolor: "background.default",
        }}
      >
        {children}
      </Grid>

      <Drawer
        open={isMobile}
        onClose={handleClose}
        PaperProps={{ sx: { width: "min(75vw, 18rem)" } }}
      >
        <SideBar w={"100%"} />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
