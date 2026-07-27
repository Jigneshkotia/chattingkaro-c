import { Container, Paper, Typography } from "@mui/material";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100vh",
        py: { xs: 2, sm: 3 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          padding: { xs: "1rem", sm: "1.5rem 2rem" },
          borderRadius: "1.25rem",
          margin: "auto",
          width: "100%",
          overflow: "hidden",
          height: "100%",
          boxShadow: "0 2px 12px rgba(22,27,51,0.06)",
        }}
      >
        <Typography
          textAlign={"center"}
          variant="h5"
          fontWeight={700}
          sx={{
            margin: "0.5rem 0 1.5rem",
          }}
        >
          {heading}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          style={{ height: "80%" }}
          sx={{
            border: "none",
            fontSize: "0.9rem",
            ".MuiDataGrid-columnHeaders": {
              bgcolor: "primary.main",
              color: "white",
              borderRadius: "12px",
            },
            ".MuiDataGrid-columnHeaderTitle": {
              fontWeight: 700,
            },
            ".MuiDataGrid-row:hover": {
              bgcolor: "rgba(55,82,217,0.04)",
            },
            ".MuiDataGrid-footerContainer": {
              borderTop: "1px solid",
              borderColor: "divider",
            },
          }}
        />
      </Paper>
    </Container>
  );
};

export default Table;
