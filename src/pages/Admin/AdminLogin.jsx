import { useInputValidation } from '6pp';
import { AdminPanelSettings as AdminPanelSettingsIcon } from '@mui/icons-material';
import { Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { adminLogin, getAdmin } from '../../redux/thunks/admin';

// const isAdmin = true;

const AdminLogin = () => {

    const {isAdmin} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();

    const secretKey = useInputValidation("")
    const submitHandler = (e)=>{
        e.preventDefault();
        dispatch(adminLogin(secretKey.value))
    }

    useEffect(()=>{
      dispatch(getAdmin())
    },[dispatch])

    if(isAdmin) return <Navigate to="/admin/dashboard" />;

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
            <AdminPanelSettingsIcon sx={{ color: "white", fontSize: "1.75rem" }} />
          </Stack>
          <Typography variant="h5" fontWeight={700} color="white">
            Admin Console
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
          <Typography variant='h5' fontWeight={700}>Admin Login</Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Enter the secret key to continue
          </Typography>
          <form style={{
              width: "100%",
              marginTop : '1.5rem'
            }}
              onSubmit={submitHandler}
            >
              <TextField
                required
                fullWidth
                label="Secret Key"
                type= "Password"
                margin = "normal"
                variant ="outlined"
                value={secretKey.value}
                onChange={secretKey.changeHandler}

              />

              <Button
                sx={{
                  marginTop: "1rem"
                }}
                fullWidth
                size="large"
                variant="contained"
                color='primary'
                type='submit'
              >Login</Button>

            </form>

        </Paper>
      </Container>
      </Box>
  )
}

export default AdminLogin