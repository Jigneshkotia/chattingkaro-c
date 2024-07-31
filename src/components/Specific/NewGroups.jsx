import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../Constants/sampleData";
import UserItem from "../Shared/UserItem";
import { useDispatch, useSelector } from "react-redux";
import { useAvailableFriendsQuery, useNewGroupMutation } from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import { setIsNewGroup } from "../../redux/reducers/misc";
import toast from "react-hot-toast";

const NewGroups = () => {
  const {isNewGroup} = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();

  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation)

  const [selectedMembers, setSelectedMembers] = useState([]);


  const errors = [
    {
      isError,
      error,
    },
  ];
  useErrors(errors);

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const submitHandler = () => {
    if(!groupName.value) return toast.error("Group name is required");

    if(selectedMembers.length < 2) return toast.error("Group should have atleast 3 members")

    newGroup("Creating Group...",{ name:groupName.value, members: selectedMembers })

    closeHandler();
  };
  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };
  const groupName = useInputValidation("");

  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack
        p={{
          xs: "1rem",
          sm: "2rem",
        }}
        width={"20rem"}
        spacing={"2rem"}
      >
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>
        <TextField
          label="Group Name "
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant="body1" textAlign={"center"} >MEMBERS</Typography>
        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
            data.friends?.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              />
            ))
          )}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant="outlined" color="error" size="large" onClick={closeHandler} >
            Cancel
          </Button>
          <Button variant="contained" size="large" onClick={submitHandler} disabled={isLoadingNewGroup} >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroups;
