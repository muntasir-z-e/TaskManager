import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { CreateTaskCardProps } from "@/types/task";

export default function CreateTaskCard({ onClick }: CreateTaskCardProps) {
  return (
    <Card
      sx={{
        height: "250px",
        width: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        "&:hover": {
          bgcolor: "action.hover",
        },
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            bgcolor: "primary.main",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            component="span"
            color="white"
            sx={{ lineHeight: 1 }}
          >
            +
          </Typography>
        </Box>
        <Typography variant="h6" color="text.secondary">
          Create Task
        </Typography>
      </Box>
    </Card>
  );
}
