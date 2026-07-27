import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Stack, Typography } from "@mui/material";
import { ChatBubbleOutline } from "@mui/icons-material";

const Home = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100%"}
      flexGrow={1}
      sx={{ bgcolor: "#F5F7FB" }}
    >
      <Stack alignItems="center" spacing={1.5} sx={{ px: 3 }}>
        <ChatBubbleOutline sx={{ fontSize: "3.5rem", color: "primary.light" }} />
        <Typography variant="h6" fontWeight={600} color="text.primary" textAlign="center">
          Select a friend to start chatting
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Choose a conversation from the list to see messages here.
        </Typography>
      </Stack>
    </Box>
  );
};

export default AppLayout()(Home);
