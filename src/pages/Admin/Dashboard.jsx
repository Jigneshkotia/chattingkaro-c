import { useFetchData } from "6pp";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon
} from "@mui/icons-material";
import { Box, Container, Paper, Skeleton, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { server } from "../../Constants/config";
import { DoughnutChart, LineChart } from "../../components/Specific/Charts";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  CurveButton,
  SearchField,
} from "../../components/styles/styled.component";
import { useErrors } from "../../hooks/hook";

const Dashboard = () => {

  const {loading, data, error} = useFetchData(`${server}/api/v1/admin/stats`,"dashboard-stats")

  const {stats} = data || {};

  console.log(stats)

  useErrors([{
    isError : error,
    error : error
  }])

  const AppBar = (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem 0rem",
        borderRadius: "1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon sx={{ fontSize: "3rem" }} />
        <SearchField placeholder="Search..." />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography >{moment().format("dddd, D MMMM YYYY")}</Typography>
        <NotificationsIcon />
      </Stack>
    </Paper>
  );

  const Widgets = (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={"2rem"}
      justifyContent={"space-between"}
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget title={"users"} value={stats?.usersCount} icon={<PersonIcon />} />
      <Widget title={"chats"} value={stats?.totalChatsCount} icon={<GroupIcon />} />
      <Widget title={"messages"} value={stats?.messagesCount} icon={<MessageIcon />} />
    </Stack>
  );

  return  (
    <AdminLayout>
      {
        loading? <Skeleton /> : <Container component={"main"}>
        {AppBar}
        <Stack
          direction={{
            xs: "column",
            lg: "row",
          }}
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={{
            xs: "center",
            lg : "stretch"
          }}
          sx={{
            gap : "2rem"
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: " 2rem 3.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "45rem",
            }}
          >
            <Typography margin={"2rem 0"} variant="h4">
              Last Messages
            </Typography>
            <LineChart value={stats?.messagesChart || {}} />
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              position: "relative",
              width: "100%",
              maxWidth: "25rem",
            }}
          >
            <DoughnutChart
              value={[ stats?.totalChatsCount - stats?.groupCount || 0 , stats?.groupCount || 0]}
              labels={["Single Chats", "GroupChats"]}
            />
            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <GroupIcon />
              <Typography>Vs</Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>
        {Widgets}
      </Container>
      }
    </AdminLayout>
  );
};

const Widget = ({ title, value, icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1.5rem",
      width: "20rem",
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: "rgba(0,0,0,0.7)",
          borderRadius: "50%",
          border: `5px solid rgba(0,0,0,0.9)`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </Typography>
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        {icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default Dashboard;
