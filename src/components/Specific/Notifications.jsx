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
    <Dialog open={isNotification} onClose={closeHandler} >
      <Stack
        p={{
          xs: "1rem",
          sm: "2rem",
        }}
        maxWidth={"25rem"}
      >
        <DialogTitle textAlign={"center"}>Notifications</DialogTitle>
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
          <Typography textAlign={"center"}>0 Notifications</Typography>
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
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {name} send you a friend request.
        </Typography>
        <Stack direction={{xs:"column", sm:"row"}}>
          <Button onClick={()=>handler({_id,accept:true})}>Accept</Button>
          <Button color="error" onClick={()=>handler({_id,accept:false})}>Reject</Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
