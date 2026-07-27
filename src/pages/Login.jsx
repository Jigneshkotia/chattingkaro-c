import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  TextField,
  Paper,
  Typography,
  Avatar,
  IconButton,
  Stack,
  Box,
} from "@mui/material";
import { CameraAlt, ChatBubble as ChatBubbleIcon } from "@mui/icons-material";
import { HiddenInput } from "../components/styles/styled.component";
import { useFileHandler, useInputValidation } from "6pp";
import axios from "axios";
import { server } from "../Constants/config";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import toast from "react-hot-toast";
import { usernameValidator } from "../utils/validators";


const Login = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const toggleLogin = () => setIsLogin((prev) => !prev);
  const avatar = useFileHandler("single");

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
 


  const handleSignUp = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
 
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message,{
        id: toastId,
      });

      window.location.reload();

    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong",{
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlelogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...")
    setIsLoading(true)
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message,{id:toastId});

      window.location.reload();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Invalid Username or Password",{id:toastId}
      );
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "radial-gradient(circle at top left, #4661E6 0%, #1F2F73 55%, #161B33 100%)",
        px: 2,
        py: { xs: 4, sm: 0 },
      }}
    >
      <Container component={"main"} maxWidth="xs" disableGutters>
        <Stack alignItems="center" spacing={1} sx={{ mb: 3 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: 56,
              height: 56,
              borderRadius: "16px",
              bgcolor: "rgba(255,255,255,0.12)",
            }}
          >
            <ChatBubbleIcon sx={{ color: "white", fontSize: "1.75rem" }} />
          </Stack>
          <Typography variant="h5" fontWeight={700} color="white">
            Chatting Karo
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.7)">
            Real-time conversations, made simple.
          </Typography>
        </Stack>

        <Paper
          elevation={0}
          sx={{
            padding: { xs: 3, sm: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "20px",
            boxShadow: "0 24px 48px rgba(0,0,0,0.25)",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5" fontWeight={700}>Welcome back</Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                Log in to continue chatting
              </Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1.5rem",
                }}
                onSubmit={handlelogin}
              >
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="Password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />

                <Button
                  sx={{
                    marginTop: "1rem",
                  }}
                  fullWidth
                  size="large"
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                >
                  Login
                </Button>

                <Typography textAlign={"center"} color="text.secondary" variant="caption" m={"1rem"} display="block">
                  OR
                </Typography>

                <Button disabled={isLoading} fullWidth variant="outlined" onClick={toggleLogin}>
                  Sign Up Instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5" fontWeight={700}>Create account</Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                Join Chatting Karo in seconds
              </Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1.5rem",
                }}
                onSubmit={handleSignUp}
              >
                <Stack position={"relative"} width={"7rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      height: "7rem",
                      width: "7rem",
                      objectFit: "contain",
                      border: "3px solid",
                      borderColor: "primary.light",
                    }}
                    src={avatar.preview}
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      color: "white",
                      bgcolor: "primary.main",
                      ":hover": {
                        bgcolor: "primary.dark",
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAlt fontSize="small" />
                      <HiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>

                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                />
                <TextField
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="Password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />

                <Button
                  sx={{
                    marginTop: "1rem",
                  }}
                  fullWidth
                  size="large"
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                >
                  Sign Up
                </Button>

                <Typography textAlign={"center"} color="text.secondary" variant="caption" m={"1rem"} display="block">
                  OR
                </Typography>

                <Button disabled={isLoading} fullWidth variant="outlined" onClick={toggleLogin}>
                  Login Instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
