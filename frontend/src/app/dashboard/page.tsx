"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Box, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { taskService } from "@/services/taskService";
import { CreateTaskDto } from "@/types/task";
import AppLayout from "@/components/Layout/AppLayout";
import TaskCard from "@/components/Tasks/TaskCard";
import CreateTaskCard from "@/components/Tasks/CreateTaskCard";
import TaskCreationModal from "@/components/Tasks/TaskCreationModal";
import TaskFilterBar from "@/components/Tasks/TaskFilterBar";
import { TaskFormData } from "@/schemas/taskSchema";

export default function DashboardPage() {
  const router = useRouter();
  const [status, setStatus] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const {
    data: tasks,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tasks", status, search],
    queryFn: () => taskService.getTasks({ status, search }),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: taskService.deleteTask,
    onSuccess: () => {
      refetch();
    },
  });

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
      setIsModalOpen(false);
      refetch();
    },
    onError: (error: unknown) => {
      const errorMsg =
        error instanceof Error ? error.message : "Failed to create task";
      setCreateError(errorMsg);
    },
  });

  const handleCreateSubmit = async (data: TaskFormData) => {
    createTaskMutation.mutate(data);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTaskMutation.mutate(id);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/tasks/${id}`);
  };

  return (
    <AppLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        My Tasks
      </Typography>

      <TaskFilterBar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          Error loading tasks. Please try again.
        </Alert>
      )}

      {tasks && tasks.length === 0 && (
        <Alert severity="info" sx={{ my: 2 }}>
          No tasks found. Create a new task to get started.
        </Alert>
      )}

      <Grid container spacing={3}>
        {tasks?.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <TaskCard task={task} onEdit={handleEdit} onDelete={handleDelete} />
          </Grid>
        ))}

        {/* Create Task Card */}
        <Grid item xs={12} sm={6} md={4}>
          <CreateTaskCard onClick={() => setIsModalOpen(true)} />
        </Grid>
      </Grid>

      {/* Task Creation Modal */}
      <TaskCreationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateSubmit}
        isSubmitting={createTaskMutation.isPending}
        error={createError}
      />
    </AppLayout>
  );
}
