import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hook";
import { useLazySearchUserQuery, useSendFriendRequestMutation } from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";
import UserItem from "../Shared/UserItem";

const Search = () => {
  const dispatch = useDispatch();
  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest,isLodingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);

  const search = useInputValidation("");


  const [users, setUsers] = useState([]);

  const addFriendHandler = async(id) => {
   await sendFriendRequest("Sending Friend Request...",{userId : id})
  };

  const searchCloseHandler = () => dispatch(setIsSearch(false));

  useEffect(() => {
    if (search.value.trim() !== "") {
      const timeOutId = setTimeout(() => {
        searchUser(search.value)
          .then(({ data }) => setUsers(data.users))
          .catch((e) => console.log(e));
      }, 500);

      return () => {
        clearTimeout(timeOutId);
      };
    } else {
      setUsers([]);
    }
  }, [search.value]);

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler} fullWidth maxWidth="xs">
      <Stack padding={{ xs: "1.25rem", sm: "1.75rem" }} direction={"column"} spacing={1.5}>
        <DialogTitle sx={{ textAlign: "center", p: 0, fontWeight: 700 }}>
          Find People
        </DialogTitle>
        <TextField
          placeholder="Search by name..."
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <List sx={{ maxHeight: "20rem", overflow: "auto" }}>
          {users.length === 0 && (
            <Typography textAlign="center" color="text.secondary" variant="body2" py={2}>
              {search.value ? "No users found" : "Start typing to search"}
            </Typography>
          )}
          {users.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={addFriendHandler}
              handlerIsLoading={isLodingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
