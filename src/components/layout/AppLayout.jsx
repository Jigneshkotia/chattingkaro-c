import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "./Header";
import Title from "../Shared/Title";
import { Box, Drawer, Grid, Skeleton } from "@mui/material";
import ChatList from "../Specific/ChatList";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../Specific/Profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsDeleteMenu, setIsMobile } from "../../redux/reducers/misc";
import useSocketEvents, { useErrors } from "../../hooks/hook";
import { GetSocket } from "../../socket";
import {
  NEW_MESSAGES_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../../Constants/events";
import {
  incrementNotification,
  setNewMessagesAlert,
} from "../../redux/reducers/chat";
import { getOrSaveFromStorage } from "../../lib/features";
import { DeleteChatMenu } from "../Dialogs/DeleteChatMenu";
import { myBlue } from "../../Constants/Colors";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const chatId = params.chatId;
    const deleteMenuAnchor = useRef(null);
    
    const [onlineUsers, setOnlineUsers] = useState([])

    const socket = GetSocket();

    const { isMobile } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);
    const { newMessagesAlert } = useSelector((state) => state.chat);

    // console.log('newMessagesAlert', newMessagesAlert);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromStorage({
        key: NEW_MESSAGES_ALERT,
        value: newMessagesAlert,
      });
    }, [newMessagesAlert]);

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault(); 
      deleteMenuAnchor.current = e.currentTarget; 
      dispatch(setIsDeleteMenu(true)); 
    };

    const handleMobileClose = () => dispatch(setIsMobile(false));

    const newMessageAlertListener = useCallback(
      (data) => {
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId]
    );

    const newRequestListener = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const refetchListener = useCallback(() => {
      refetch();
      navigate("/");
    }, [refetch, navigate]);

    const onlineUsersListener = useCallback(() => {
      setOnlineUsers(data)
      console.log(data);
    }, []);

    const eventHandlers = {
      [NEW_MESSAGES_ALERT]: newMessageAlertListener,
      [NEW_REQUEST]: newRequestListener,
      [REFETCH_CHATS]: refetchListener,
      [ONLINE_USERS]: onlineUsersListener
    };

    useSocketEvents(socket, eventHandlers);

    return (
      <Box>
        <Title />
        <Header />

        <DeleteChatMenu
          dispatch={dispatch}
          deleteMenuAnchor={deleteMenuAnchor}
        />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose} >
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              HandleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
              onlineUsers={onlineUsers}
            />
          </Drawer>
        )}

        <Grid container height={"calc(100vh - 5rem)"} spacing={1} sx={{ flexGrow: 1, p: 1 }} >
          <Grid
            item
            sm={4}
            md={3}
            sx={{ display: { xs: "none", sm: "block" }, height: '100%' }}
            height={"100%"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                HandleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
                onlineUsers={onlineUsers}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            sx={{
              display: { xs: "none", md: "block" },
              p: 2,
              bgcolor: myBlue,
              border: "0.1px solid",
              borderRadius: "20px",
              height: '100%',
              alignItems: 'center', 
              justifyContent: 'center', 
            }}
            height={"100%"}
          >
            <Profile user={user} />
          </Grid>
        </Grid>
      </Box>
    );
  };
};

export default AppLayout;
