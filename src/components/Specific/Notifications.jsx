import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography
} from "@mui/material";
import React, { memo } from "react";
import { useAcceptFriendRequestMutation, useGetNotificationQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducers/misc";
import toast from "react-hot-toast";

const Notifications = () => {

  const {isNotification} = useSelector((state)=> state.misc)
  const dispatch = useDispatch();

  const {isLoading,data,error,isError} = useGetNotificationQuery()

  const [acceptRequest] = useAcceptFriendRequestMutation()

  const friendRequestHandler = async({ _id, accept }) => {

    dispatch(setIsNotification(false))
    console.log("hey")
    try {
      const res = await acceptRequest({requestId: _id, accept})
      console.log(res);
      console.log("hey2")
      if(res.data?.success){
        console.log("Use Socket Here");
        toast.success(res.data.message)
      }else{
        console.log("hey3")
        toast.error(res.data?.error || "Something went wrong1")
      }

    } catch (error) {
      toast.error(error.message || "Something went wrong");
      console.log(error)
    }
  };

  // const friendRequestHandler = async ({ _id, accept }) => {
  //   dispatch(setIsNotification(false));
  //   await acceptRequest("Accepting...", { requestId: _id, accept });
  // };

  const  closeHandler = ()=> dispatch(setIsNotification(false));

  useErrors([{error,isError}])

  return (
    <Dialog open={isNotification} onClose={closeHandler} fullWidth maxWidth="xs">
      <Stack
        p={{
          xs: "1.25rem",
          sm: "1.75rem",
        }}
        spacing={1}
      >
        <DialogTitle sx={{ textAlign: "center", p: 0, fontWeight: 700 }}>
          Notifications
        </DialogTitle>
         {
          isLoading ? <Skeleton />: <>
          {data?.allRequests.length > 0 ? (
          data?.allRequests?.map((i) => (
            <NotificationItem
              sender={i.sender}
              _id={i._id}
              handler={friendRequestHandler}
              key={i._id}
            />
          ))
        ) : (
          <Typography textAlign={"center"} color="text.secondary" py={2}>
            No notifications yet
          </Typography>
        )}
          </>
         }
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem disablePadding sx={{ py: 0.75 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar} />
        <Typography
          variant="body2"
          fontWeight={500}
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          <b>{name}</b> sent you a friend request.
        </Typography>
        <Stack direction={{xs:"column", sm:"row"}} spacing={0.5}>
          <Button size="small" variant="contained" onClick={()=>handler({_id,accept:true})}>Accept</Button>
          <Button size="small" color="error" variant="outlined" onClick={()=>handler({_id,accept:false})}>Reject</Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
