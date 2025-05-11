import React from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { TaskCardProps } from "@/types/task";

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const getStatusColor = (
    status: string
  ): "warning" | "info" | "success" | "default" => {
    switch (status) {
      case "pending":
        return "warning";
      case "in-progress":
        return "info";
      case "completed":
        return "success";
      default:
        return "default";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No due date";
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch {
      return "Invalid date";
    }
  };

  return (
    <Card
      sx={{
        height: "250px",
        width: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent
        sx={{
          flex: "1 1 auto",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          pb: 1,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom noWrap>
          {task.title}
        </Typography>
        <Chip
          label={task.status.replace("-", " ")}
          color={getStatusColor(task.status)}
          size="small"
          sx={{ mb: 2, alignSelf: "flex-start" }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Due: {formatDate(task.dueDate)}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden",
          }}
        >
          {task.description || "No description provided"}
        </Typography>
      </CardContent>
      <CardActions sx={{ pt: 0 }}>
        <Button
          size="small"
          startIcon={<Edit />}
          onClick={() => onEdit(task.id)}
        >
          Edit
        </Button>
        <Button
          size="small"
          color="error"
          startIcon={<Delete />}
          onClick={() => onDelete(task.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
