import { Add as AddIcon, Remove as RemoveIcon} from "@mui/icons-material";
import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React , {memo} from "react";
import { transformImage } from "../../lib/features";

const UserItem = ({ user, handler, handlerIsLoading, isAdded=false ,styling={}}) => {
  const { name, _id, avatar } = user;
  return (
    <ListItem disablePadding sx={{ py: 0.4 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        sx={{
          borderRadius: "12px",
          padding: "0.6rem 0.75rem",
          transition: "background-color 150ms ease",
          "&:hover": { bgcolor: "rgba(55,82,217,0.05)" },
        }}
        {...styling}
      >
        <Avatar src={transformImage(avatar)}/>
        <Typography
            variant="body1"
            fontWeight={500}
            sx={{
                flexGrow: 1,
                display: "-webkit-box",
                WebkitLineClamp : 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%"
            }}
        >{name}</Typography>
        <IconButton
        size="small"
        sx={{
            bgcolor:isAdded? "error.main" : "primary.main",
            color: "white",
            "&:hover":{
              bgcolor:isAdded? "error.dark" : "primary.dark",
            }
        }}
        onClick={() => handler(_id)} disabled={handlerIsLoading}>
        {
          isAdded? <RemoveIcon fontSize="small" /> : <AddIcon fontSize="small" />
        }

        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
