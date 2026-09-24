import React, { memo } from "react";
import { Link } from "../styles/styled.component";
import { Box, Chip, Stack, Typography } from "@mui/material";
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
  isDummyChat = false,
}) => {
  return (
    <Link
      sx={{
        padding: "0",
        display: "block",
      }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.25 }}

        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          padding: "0.85rem 1.25rem",
          margin: "0.15rem 0.5rem",
          position: "relative",
          backgroundColor: sameSender ? myBlue : "transparent",
          color: sameSender ? "white" : "inherit",
          borderRadius: "14px",
          transition: "background-color 150ms ease",
        }}
      >
        <AvatarCard avatar={avatar} />
        <Stack sx={{ minWidth: 0, flexGrow: 1 }}>
          <Typography noWrap fontWeight={600} title={name}>
            {name}
          </Typography>
          {isDummyChat && <Chip label="AI Clone" size="small" color="secondary" sx={{ width: "fit-content", height: "1.25rem", fontSize: "0.68rem" }} />}
          {newMessageAlert && (
            <Chip
              label={`${newMessageAlert.count} new`}
              size="small"
              sx={{
                width: "fit-content",
                height: "1.25rem",
                fontSize: "0.7rem",
                bgcolor: sameSender ? "rgba(255,255,255,0.2)" : "secondary.main",
                color: "white",
              }}
            />
          )}
        </Stack>
        {isOnline && (
          <Box
            sx={{
              width: "0.65rem",
              height: "0.65rem",
              borderRadius: "50%",
              backgroundColor: "#2FA972",
              border: "2px solid",
              borderColor: sameSender ? myBlue : "background.paper",
              flexShrink: 0,
            }}
          ></Box>
        )}
      </motion.div>
    </Link>
  );
};

export default memo(ChatItem);
