import { Grid, Skeleton, Stack } from "@mui/material";
import React from "react";
import { BouncingSkeleton } from "../styles/styled.component";

const LayoutLoaders = () => {
  return (
    <Grid container height={"calc(100vh - 5.5rem)"} spacing={1.25} sx={{ p: { xs: 0.75, sm: 1.25 } }}>
      <Grid
        item
        sm={4}
        md={3}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
        height={"100%"}
      >
        <Skeleton variant="rectangular" height={"100%"} sx={{ borderRadius: "18px" }} />
      </Grid>
      <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"} sx={{ borderRadius: "18px", overflow: "hidden" }}>
        <Stack spacing={"1rem"} height="100%">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={"3.5rem"} sx={{ borderRadius: "12px" }} />
          ))}
        </Stack>
      </Grid>
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: { xs: "none", md: "block" },
        }}
        height={"100%"}
      >
        <Skeleton variant="rectangular" height={"100%"} sx={{ borderRadius: "18px" }} />
      </Grid>
    </Grid>
  );
};

const TypingLoader = () => {
  return (
    <Stack
      spacing={"0.4rem"}
      direction={"row"}
      alignItems={"center"}
      padding={"0.6rem 0.9rem"}
      width="fit-content"
      sx={{ bgcolor: "#ffffff", borderRadius: "16px 16px 16px 4px", boxShadow: "0 1px 4px rgba(22,27,51,0.08)" }}
    >
      <BouncingSkeleton variant="circular" width={8} height={8} style={{
        animationDelay: "0.1s",
      }} />
      <BouncingSkeleton variant="circular" width={8} height={8} style={{
        animationDelay: "0.2s",
      }} />
      <BouncingSkeleton variant="circular" width={8} height={8} style={{
        animationDelay: "0.4s",
      }} />
    </Stack>
  );
};

export { TypingLoader, LayoutLoaders };
