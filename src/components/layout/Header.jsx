import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, useState } from "react";
import { myBlue } from "../../Constants/Colors";
import {
  Add as AddIcon,
  ChatBubble as ChatBubbleIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications,
  Search as SreachIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../Constants/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import {
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
} from "../../redux/reducers/misc";
import { resetNotificationCount } from "../../redux/reducers/chat";

const SearchDialog = lazy(() => import("../Specific/Search"));
const NotificationDialog = lazy(() => import("../Specific/Notifications"));
const NewGroupDialog = lazy(() => import("../Specific/NewGroups"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );
  const { notificationCount } = useSelector((state) => state.chat);

  const HandleMobile = () => dispatch(setIsMobile(true));

  const openSearch = () => dispatch(setIsSearch(true));

  const OpenNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };
  const OpenNotifications = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };

  const navigateToGroup = () => navigate("/groups");

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Worng");
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          position: "sticky",
          top: 0,
          zIndex: (t) => t.zIndex.appBar,
          px: { xs: 0.75, sm: 1 },
          pt: { xs: 0.75, sm: 1 },
        }}
      >
        <AppBar
          position="static"
          elevation={0}
          sx={{
            borderRadius: "18px",
            bgcolor: myBlue,
            backgroundImage: `linear-gradient(135deg, ${myBlue} 0%, #2A3FAD 100%)`,
            boxShadow: "0 8px 24px rgba(55,82,217,0.28)",
          }}
        >
          <Toolbar sx={{ py: { xs: 0.5, sm: 0.75 }, gap: 0.5 }}>
            <Box
              sx={{
                display: { xs: "flex", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={HandleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>

            <Stack direction="row" alignItems="center" spacing={1.25} sx={{ display: { xs: "none", sm: "flex" } }}>
              <ChatBubbleIcon />
              <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.2 }}>
                Chatting Karo
              </Typography>
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            <Stack direction="row" spacing={{ xs: 0, sm: 0.5 }}>
              <Tooltip title="Search">
                <IconButton color="inherit" size="large" onClick={openSearch}>
                  <SreachIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="New Group">
                <IconButton color="inherit" size="large" onClick={OpenNewGroup}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Manage Groups">
                <IconButton
                  color="inherit"
                  size="large"
                  onClick={navigateToGroup}
                >
                  <GroupIcon />
                </IconButton>
              </Tooltip>
              <IconBtn
                title={"Notifications"}
                icon={<Notifications />}
                onClick={OpenNotifications}
                value={notificationCount}
              />
              <Tooltip title="Logout">
                <IconButton
                  color="inherit"
                  size="large"
                  onClick={logoutHandler}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
