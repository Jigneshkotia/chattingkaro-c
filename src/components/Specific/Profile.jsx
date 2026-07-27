import {
  CalendarMonth as CalanderIcon,
  Face as FaceIcon,
  AlternateEmail as UsernameIcon,
} from "@mui/icons-material";
import { Avatar, Divider, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";

const Profile = ({ user }) => {
  return (
    <Stack
      spacing={"1.5rem"}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ width: "100%", height: "100%", px: 1 }}
    >
      <Avatar
        src={user?.avatar?.url}
        sx={{
          width: { xs: 120, md: 160 },
          height: { xs: 120, md: 160 },
          objectFit: "contain",
          border: "4px solid rgba(255,255,255,0.85)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        }}
      />

      <Stack alignItems="center" spacing={0.25}>
        <Typography variant="h6" color="white" fontWeight={700}>
          {user?.name}
        </Typography>
        {user?.bio && (
          <Typography
            variant="body2"
            color="rgba(255,255,255,0.75)"
            textAlign="center"
            sx={{ maxWidth: "16rem" }}
          >
            {user.bio}
          </Typography>
        )}
      </Stack>

      <Divider flexItem sx={{ borderColor: "rgba(255,255,255,0.15)" }} />

      <Stack spacing={"1.25rem"} width="100%">
        <ProfileCard
          heading={"Username"}
          text={user?.username}
          Icon={<UsernameIcon />}
        />
        <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
        <ProfileCard
          heading={"Joined"}
          text={moment(user?.createdAt).fromNow()}
          Icon={<CalanderIcon />}
        />
      </Stack>
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
  >
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 40,
        height: 40,
        borderRadius: "12px",
        bgcolor: "rgba(255,255,255,0.12)",
        flexShrink: 0,
      }}
    >
      {Icon}
    </Stack>
    <Stack sx={{ minWidth: 0 }}>
      <Typography
        variant="body1"
        fontWeight={600}
        noWrap
        title={text}
      >
        {text}
      </Typography>
      <Typography color={"rgba(255,255,255,0.6)"} variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
