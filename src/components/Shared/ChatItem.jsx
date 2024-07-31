import React, { memo } from "react";
import { Link } from "../styles/styled.component";
import { Box, Stack, Typography } from "@mui/material";
import AvatarCard from "./AvatarCard";
import { motion } from "framer-motion";
import { myBlue } from "../../Constants/Colors";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline = false,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  return (
    <Link
      sx={{
        padding: "0",
      }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <motion.div
        initial={{opacity:0, y: "-100%"}}
        whileInView={{opacity:1, y: 0 }}
        transition={{delay: index*0.1}}

        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          padding: "1rem",
          paddingLeft: "2rem",
          position: "relative",
          backgroundColor: sameSender ? myBlue : "unset",
          color: sameSender ? "white" : "unset",
          border: "2px ",
          borderRadius : "20px"
        }}
      >
        <AvatarCard avatar={avatar} />
        <Stack>
          <Typography>{name}</Typography>
          {newMessageAlert && (
            <Typography>{newMessageAlert.count} New Message</Typography>
          )}
        </Stack>
        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          ></Box>
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);
