import { Delete as DeleteIcon } from "@mui/icons-material";
import { Menu, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { setIsDeleteMenu } from "../../redux/reducers/misc";

const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {
  const { isDeleteMenu } = useSelector((state) => state.misc);
  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
  };
  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteMenuAnchor.current}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center"
      }}
      PaperProps={{ sx: { borderRadius: "12px" } }}
    >
      <Stack
        sx={{
          width: "10rem",
          padding: "0.6rem 0.9rem",
          cursor: "pointer",
          borderRadius: "8px",
          color: "error.main",
          "&:hover": { bgcolor: "rgba(229,72,77,0.08)" },
        }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.75rem"}
        onClick={closeHandler}
      >
        <DeleteIcon fontSize="small" />
        <Typography variant="body2" fontWeight={600}>
          Delete Chat
        </Typography>
      </Stack>
    </Menu>
  );
};

export { DeleteChatMenu };