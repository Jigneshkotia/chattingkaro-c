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
      elevation={0}
      sx={{
        padding: { xs: "1.25rem", sm: "1.5rem 2rem" },
        margin: "1.5rem 0rem",
        borderRadius: "1.25rem",
        boxShadow: "0 2px 12px rgba(22,27,51,0.06)",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ width: 48, height: 48, borderRadius: "12px", bgcolor: "primary.main", color: "white", flexShrink: 0 }}
        >
          <AdminPanelSettingsIcon />
        </Stack>
        <SearchField placeholder="Search..." sx={{ display: { xs: "none", sm: "block" } }} />
        <CurveButton sx={{ display: { xs: "none", sm: "block" } }}>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography color="text.secondary" sx={{ display: { xs: "none", md: "block" } }}>
          {moment().format("dddd, D MMMM YYYY")}
        </Typography>
        <NotificationsIcon color="action" />
      </Stack>
    </Paper>
  );

  const Widgets = (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={"1.5rem"}
      justifyContent={"space-between"}
      alignItems={"stretch"}
      margin={"1.5rem 0"}
    >
      <Widget title={"Users"} value={stats?.usersCount} icon={<PersonIcon />} color="#3752D9" />
      <Widget title={"Chats"} value={stats?.totalChatsCount} icon={<GroupIcon />} color="#FF6F59" />
      <Widget title={"Messages"} value={stats?.messagesCount} icon={<MessageIcon />} color="#2FA972" />
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
            elevation={0}
            sx={{
              padding: { xs: "1.5rem", sm: "2rem 2.5rem" },
              borderRadius: "1.25rem",
              width: "100%",
              maxWidth: "45rem",
              boxShadow: "0 2px 12px rgba(22,27,51,0.06)",
            }}
          >
            <Typography margin={"0 0 1.5rem"} variant="h6" fontWeight={700}>
              Last Messages
            </Typography>
            <LineChart value={stats?.messagesChart || {}} />
          </Paper>
          <Paper
            elevation={0}
            sx={{
              padding: "1.5rem",
              borderRadius: "1.25rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              width: "100%",
              maxWidth: "25rem",
              boxShadow: "0 2px 12px rgba(22,27,51,0.06)",
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

const Widget = ({ title, value, icon, color = "#3752D9" }) => (
  <Paper
    elevation={0}
    sx={{
      padding: "1.5rem",
      borderRadius: "1.25rem",
      width: "100%",
      boxShadow: "0 2px 12px rgba(22,27,51,0.06)",
      flex: 1,
    }}
  >
    <Stack direction="row" alignItems={"center"} spacing={"1.25rem"}>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "3.5rem",
          height: "3.5rem",
          borderRadius: "14px",
          bgcolor: `${color}1A`,
          color: color,
          flexShrink: 0,
        }}
      >
        {icon}
      </Stack>
      <Stack>
        <Typography variant="h4" fontWeight={700}>
          {value ?? 0}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {title}
        </Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default Dashboard;
