import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField
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
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack padding={"2rem"} direction={"column"} width={"20rem"}>
        <DialogTitle textAlign={"center"}>find people</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
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
