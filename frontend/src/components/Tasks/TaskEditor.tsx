"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { taskService, UpdateTaskDto } from "@/services/taskService";
import TaskForm, { TaskFormData } from "@/components/Tasks/TaskForm";
import AppLayout from "@/components/Layout/AppLayout";

// Client component that takes taskId as a prop instead of accessing params directly
export default function TaskEditor({ taskId }: { taskId: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    data: task,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => taskService.getTaskById(taskId),
  });

  const updateTaskMutation = useMutation({
    mutationFn: (formData: TaskFormData) => {
      // Create a clean object that matches the UpdateTaskDto type
      const taskData: UpdateTaskDto = {
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

      return taskService.updateTask(taskId, taskData);
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (error: unknown) => {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to update task";
      setError(errorMsg);
    },
  });

  const handleSubmit = async (data: TaskFormData) => {
    updateTaskMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <AppLayout>
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      </AppLayout>
    );
  }

  if (isError) {
    return (
      <AppLayout>
        <Alert severity="error">
          Error loading task. The task may have been deleted or you don&apos;t
          have permission to view it.
        </Alert>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.push("/dashboard")}
          sx={{ mt: 2 }}
        >
          Back to Dashboard
        </Button>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Box maxWidth="md" sx={{ mx: "auto" }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.push("/dashboard")}
          sx={{ mb: 2 }}
        >
          Back to Dashboard
        </Button>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Edit Task
          </Typography>
          <TaskForm
            initialData={task}
            onSubmit={handleSubmit}
            isSubmitting={updateTaskMutation.isPending}
            error={error}
          />
        </Paper>
      </Box>
    </AppLayout>
  );
}
