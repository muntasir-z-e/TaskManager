import React from "react";
import { Modal, Paper, Button, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import TaskForm from "@/components/Tasks/TaskForm";
import { TaskFormData } from "@/schemas/taskSchema";

interface TaskCreationModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
}

export default function TaskCreationModal({
  open,
  onClose,
  onSubmit,
  isSubmitting,
  error,
}: TaskCreationModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="create-task-modal"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          p: 4,
          maxWidth: "600px",
          width: "90%",
          maxHeight: "90vh",
          overflow: "auto",
          position: "relative",
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <Close />
        </Button>
        <Typography variant="h5" component="h2" gutterBottom>
          Create New Task
        </Typography>
        <TaskForm onSubmit={onSubmit} isUpdating={isSubmitting} error={error} />
      </Paper>
    </Modal>
  );
}
