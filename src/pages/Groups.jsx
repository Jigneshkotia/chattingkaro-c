import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography
} from "@mui/material";
import React, { Suspense, lazy, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { myBlue } from "../Constants/Colors";
import AvatarCard from "../components/Shared/AvatarCard";
import UserItem from "../components/Shared/UserItem";
import { LayoutLoaders } from "../components/layout/Loaders";
import { Link } from "../components/styles/styled.component";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import {
  useChatDetailsQuery,
  useDeleteChatMutation,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation
} from "../redux/api/api";
import { setIsAddMember } from "../redux/reducers/misc";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/Dialogs/ConfirmDeleteDialog")
);

const AddMemberDialog = lazy(() =>
  import("../components/Dialogs/AddMemberDialog")
);

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);

  const myGroups = useMyGroupsQuery();
  const groupDetails = useChatDetailsQuery(
    {
      chatId,
      populate: true,
    },
    { skip: !chatId }
  );

  const [updateGroup, isLoadingGroupName] = useAsyncMutation(
    useRenameGroupMutation
  );

  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(
    useRemoveGroupMemberMutation
  );

  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(
    useDeleteChatMutation
  );

  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [membres, setMembers] = useState([]);

  const navigate = useNavigate();

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];

  useErrors(errors);
  useEffect(() => {
    if (groupDetails.data) {
      setGroupName(groupDetails.data.chat.name);
      setGroupNameUpdatedValue(groupDetails.data.chat.name);
      setMembers(groupDetails.data.chat.members);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails.data]);

  const navigateBack = () => {
    navigate("/");
  };

  const removeMemberHandler = (userId) => {
    removeMember("Removing Member...", { chatId, userId });
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const deleteHandler = () => {
    deleteGroup("Deleting Group...",chatId)
    closeConfirmDeleteHandler();
    navigate("/groups")
  };

  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateGroupName = () => {
    setIsEdit(false);
    updateGroup("Updating Group Name...", {
      chatId,
      name: groupNameUpdatedValue,
    });
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const openAddMemberHandler = () => {
    dispatch(setIsAddMember(true));
  };


  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  const iconBtns = (
    <>
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
          zIndex: 1300,
        }}
      >
        <IconButton
          onClick={handleMobile}
          sx={{ bgcolor: "background.paper", boxShadow: "0 2px 10px rgba(22,27,51,0.12)" }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: { xs: "1rem", sm: "1.5rem" },
            left: { xs: "1rem", sm: "1.5rem" },
            bgcolor: myBlue,
            color: "white",
            ":hover": {
              bgcolor: "primary.dark",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={{ xs: "1rem", sm: "2rem" }}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4" fontWeight={700} noWrap>{groupName}</Typography>
          <IconButton
            disabled={isLoadingGroupName}
            onClick={() => setIsEdit(true)}
          >
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack
      direction={{ sm: "row", xs: "column-reverse" }}
      spacing={"1rem"}
      width={{ xs: "100%", sm: "auto" }}
      maxWidth={"25rem"}
      p={{ sm: "1rem", xs: "1rem 0 0", md: "1rem 4rem" }}
    >
      <Button
        size="large"
        color="error"
        variant="outlined"
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
      >
        Add Member
      </Button>
    </Stack>
  );

  return myGroups.isLoading ? (
    <LayoutLoaders />
  ) : (
    <Grid container height={"100vh"} sx={{ bgcolor: "background.default" }} >
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
          bgcolor: "background.paper",
          borderRight: "1px solid",
          borderColor: "divider",
        }}
        sm={4}
      >
        <GroupsList mygroups={myGroups?.data?.groups} chatId={chatId} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          padding: { xs: "4rem 1.25rem 1.5rem", sm: "1.5rem 3rem" },
        }}
      >
        {iconBtns}

        {groupName && (
          <>
            {GroupName}
            <Typography
              margin={"1rem"}
              variant="overline"
              fontWeight={700}
              color="text.secondary"
            >
              Members
            </Typography>

            <Stack
              maxWidth={"25rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{ sm: "1rem", xs: "0", md: "1rem 0rem" }}
              spacing={"1rem"}
              height={"50vh"}
              overflow={"auto"}
            >
              { isLoadingRemoveMember? <CircularProgress /> : groupDetails?.data?.chat?.members?.map((i) => (
                <UserItem
                  user={i}
                  isAdded
                  styling={{
                    boxShadow: "0 2px 8px rgba(22,27,51,0.06)",
                    padding: "0.75rem 1.25rem",
                    borderRadius: "1rem",
                    bgcolor: "background.paper",
                  }}
                  handler={removeMemberHandler}
                  key={i._id}
                />
              ))}
            </Stack>

            {ButtonGroup}
          </>
        )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}

      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupsList
          w={"50vw"}
          mygroups={myGroups?.data?.groups}
          chatId={chatId}
        />
      </Drawer>
    </Grid>
  );
};

const GroupsList = ({ w = "100%", mygroups = [], chatId }) => (
  <Stack width={w} overflow={"auto"} height={"100vh"} py={2}>
    <Typography px={2} pb={1} variant="overline" fontWeight={700} color="text.secondary">
      Your Groups
    </Typography>
    {mygroups.length > 0 ? (
      mygroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} color="text.secondary" padding={"1rem"}>
        No groups yet
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack
        direction={"row"}
        spacing={"1rem"}
        alignItems={"center"}
        sx={{
          px: 2,
          py: 1,
          bgcolor: chatId === _id ? "rgba(55,82,217,0.08)" : "transparent",
        }}
      >
        <AvatarCard avatar={avatar} />
        <Typography noWrap fontWeight={500}>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
