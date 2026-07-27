import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../Constants/sampleData";
import UserItem from "../Shared/UserItem";
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/misc";

const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.misc);
  
  const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);
  
  const [selectedMembers, setSelectedMembers] = useState([]);
  
  const [addMembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMembersMutation
  );
  
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };
  
  const addMemberSubmitHandler = () => {
    addMembers("Adding Members...", { members: selectedMembers, chatId });
    closeHandler();
  };
  
  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  useErrors([{ isError, error }]);

  return (
    <Dialog open={isAddMember} onClose={closeHandler} fullWidth maxWidth="xs">
      <Stack p={{ xs: "1.25rem", sm: "1.75rem" }} spacing={"1.5rem"}>
        <DialogTitle sx={{ textAlign: "center", p: 0, fontWeight: 700 }}>
          Add Member
        </DialogTitle>
        <Stack spacing={"0.5rem"} sx={{ maxHeight: "16rem", overflow: "auto" }}>
          {isLoading ? (
            <Skeleton />
          ) : data?.availableFriends?.length > 0 ? (
            data.availableFriends.map((i) => (
              <UserItem
                user={i}
                handler={selectMemberHandler}
                key={i._id}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"} color="text.secondary" py={1}> No friends to add </Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          spacing={1.5}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button fullWidth variant="outlined" color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            fullWidth
            onClick={addMemberSubmitHandler}
            variant="contained"
            disabled={isLoadingAddMembers}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;