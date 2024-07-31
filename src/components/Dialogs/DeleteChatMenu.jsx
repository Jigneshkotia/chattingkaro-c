import { Menu, Stack } from "@mui/material";
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
    >
      <Stack
        sx={{
          width: "10rem",
          padding: "0.5rem",
          cursor: "pointer",
        }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
      >
        shie
      </Stack>
    </Menu>
  );
};

export { DeleteChatMenu };