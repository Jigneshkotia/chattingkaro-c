import React from 'react'
import {Error as ErrorIcon} from "@mui/icons-material";
import { Button, Container, Stack, Typography } from '@mui/material';
import { Link } from "react-router-dom";

const NotFound = () => {
  return <Container maxWidth="sm" sx={{height: "100vh"}} >
    <Stack alignItems={"center"} spacing={"1.5rem"} justifyContent={"center"} height={"100%"} textAlign="center" >
      <ErrorIcon color="primary" sx={{fontSize: {xs: "5rem", sm: "6rem"}}} />
      <Typography variant='h2' fontWeight={800} sx={{ fontSize: { xs: "3.5rem", sm: "5rem" } }}>
        404
      </Typography>
      <Typography variant='h6' color="text.secondary">
        The page you're looking for doesn't exist.
      </Typography>
      <Button component={Link} to="/" variant="contained" size="large" sx={{ mt: 1 }}>
        Go back home
      </Button>
    </Stack>
  </Container>
}

export default NotFound