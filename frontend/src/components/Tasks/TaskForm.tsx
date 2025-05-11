"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Alert,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TaskFormProps } from "@/types/task";
import { taskSchema, TaskFormData } from "@/schemas/taskSchema";

export default function TaskForm({
  initialData,
  onSubmit,
  isUpdating,
  error,
}: TaskFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      status: initialData?.status || "pending",
      dueDate: initialData?.dueDate || null,
    },
  });

  if (!control) return null;

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Task Title"
            autoFocus
            value={field.value || ""}
            onChange={field.onChange}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            margin="normal"
            fullWidth
            id="description"
            label="Description"
            multiline
            rows={4}
            value={field.value || ""}
            onChange={field.onChange}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <TextField
            select
            margin="normal"
            fullWidth
            id="status"
            label="Status"
            value={field.value || "pending"}
            onChange={field.onChange}
            error={!!errors.status}
            helperText={errors.status?.message}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>
        )}
      />

      <FormControl fullWidth margin="normal" error={!!errors.dueDate}>
        <Controller
          name="dueDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Due Date (Optional)"
              value={field.value ? new Date(field.value) : null}
              onChange={(date) => {
                field.onChange(date ? date.toISOString().split("T")[0] : null);
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.dueDate,
                },
              }}
            />
          )}
        />
        {errors.dueDate && (
          <FormHelperText>{errors.dueDate.message}</FormHelperText>
        )}
      </FormControl>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isUpdating}
      >
        {isUpdating ? "Saving..." : "Save Task"}
      </Button>
    </Box>
  );
}
