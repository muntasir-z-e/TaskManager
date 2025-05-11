import React from "react";
import { Box, TextField, MenuItem } from "@mui/material";
import { TaskFilterBarProps } from "@/types/task";

export default function TaskFilterBar({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: TaskFilterBarProps) {
  return (
    <Box sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
      <TextField
        label="Search tasks"
        variant="outlined"
        size="small"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ flexGrow: 1, minWidth: "200px" }}
      />

      <TextField
        select
        label="Filter by status"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        variant="outlined"
        size="small"
        sx={{ minWidth: "200px" }}
      >
        <MenuItem value="">All statuses</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="in-progress">In Progress</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
      </TextField>
    </Box>
  );
}
