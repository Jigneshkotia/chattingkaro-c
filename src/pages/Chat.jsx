import { Alert, IconButton, Skeleton, Stack } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { grayColor, myBlue, Orange } from "../Constants/Colors";
import AppLayout from "../components/layout/AppLayout";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/styled.component";
import { useRef } from "react";
import FileMenu from "../components/Dialogs/FileMenu";
import MessageComponent from "../components/Shared/MessageComponent";
import { GetSocket } from "../socket";
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from "../Constants/events";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducers/misc";
import { removeNewMessagesAlert } from "../redux/reducers/chat";
import { TypingLoader } from "../components/layout/Loaders";
import { useNavigate } from "react-router-dom";
import { green, grey } from "@mui/material/colors";

const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const socket = GetSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);
  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });

  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.message
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  // console.log("oldMessages", oldMessages);
  const members = chatDetails?.data?.chat?.members;

  const messageOnChange = (e) => {
    setMessage(e.target.value);

    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });

      setIamTyping(false);
    }, 2000);
  };

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    //emitting message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  useEffect(() => {
    socket.emit(CHAT_JOINED,{userId : user._id, members})
    dispatch(removeNewMessagesAlert(chatId));

    return () => {
      setMessage("");
      setMessages([]);
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED, {userId : user._id, members})
    };
  }, [chatId]);

  useEffect(() => { 
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
      });
  }, [messages]);

  useEffect(()=>{
    if( chatDetails.isError) return navigate("/")
  },[chatDetails.isError])

  const newMessagesListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setUserTyping(false);
    },
    [chatId]
  );

  const alertListener = useCallback((data) => {

    if(data.chatId !== chatId) return;

    const messageForAlert = {
      content: data.message,
      sender: {
        _id: "lsihdos",
        name: "Admin",
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev)=>[...prev, messageForAlert])

    },[chatId]);

  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  useSocketEvents(socket, eventHandler);
  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];

  return chatDetails.isLoading ? (
    <Skeleton variant="rectangular" height="100%" sx={{ borderRadius: "18px" }} />
  ) : (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={{ xs: "0.75rem", sm: "1.25rem" }}
        spacing={"0.75rem"}
        flexGrow={1}
        minHeight={0}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
          bgcolor: "#F5F7FB",
        }}
      >
        {chatDetails.data?.chat?.isDummyChat && (
          <Alert severity="info" icon={false} sx={{ borderRadius: 2 }}>
            ✨ AI Persona • {chatDetails.data.chat.dummyPersona?.name || chatDetails.data.chat.name} (trained on a WhatsApp chat)
          </Alert>
        )}
        {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}

        {userTyping && <TypingLoader />}
        <div ref={bottomRef} />
      </Stack>

      <form onSubmit={submitHandler}>
        <Stack
          direction={"row"}
          padding={{ xs: "0.6rem", sm: "0.9rem 1.25rem" }}
          alignItems={"center"}
          spacing={"0.5rem"}
          sx={{ bgcolor: "background.paper", borderTop: "1px solid", borderColor: "divider" }}
        >
          <IconButton onClick={handleFileOpen} sx={{ color: "text.secondary", rotate: "20deg" }}>
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type a message..."
            value={message}
            onChange={messageOnChange}
          />

          <IconButton
            type="submit"
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              padding: "0.6rem",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            <SendIcon fontSize="small" />
          </IconButton>
        </Stack>
      </form>

      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </>
  );
};

export default AppLayout()(Chat);
