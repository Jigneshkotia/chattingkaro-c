import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";
import { grayColor } from "../Constants/Colors";

const Home = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100%"}
      sx={{
        background: "linear-gradient(135deg, #9bafd951, #9bafd924)",
        border: "2px",
        borderRadius: "10px",
        marginRight: "5px",
      }}
    >
      <Typography
        p={"2rem"}
        variant="h5"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        Select a friend to chat
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
