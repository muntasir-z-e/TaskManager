"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Box, Typography, Paper } from "@mui/material";
import { taskService, CreateTaskDto } from "@/services/taskService";
import TaskForm, { TaskFormData } from "@/components/Tasks/TaskForm";
import AppLayout from "@/components/Layout/AppLayout";

export default function TaskCreator() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const createTaskMutation = useMutation({
    mutationFn: (formData: TaskFormData) => {
      // Create a clean object that matches the CreateTaskDto type
      const taskData: CreateTaskDto = {
        title: formData.title,
        status: formData.status,
      };

      // Only add optional fields if they have values
      if (formData.description) {
        taskData.description = formData.description;
      }

      if (formData.dueDate && typeof formData.dueDate === "string") {
        taskData.dueDate = formData.dueDate;
      }

      return taskService.createTask(taskData);
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (error: unknown) => {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to create task";
      setError(errorMsg);
    },
  });

  const handleSubmit = async (data: TaskFormData) => {
    createTaskMutation.mutate(data);
  };

  return (
    <AppLayout>
      <Box maxWidth="md" sx={{ mx: "auto" }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create New Task
          </Typography>
          <TaskForm
            onSubmit={handleSubmit}
            isSubmitting={createTaskMutation.isPending}
            error={error}
          />
        </Paper>
      </Box>
    </AppLayout>
  );
}
