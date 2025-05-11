// Task data model
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

// DTO interfaces
export interface CreateTaskDto {
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  dueDate?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: "pending" | "in-progress" | "completed";
  dueDate?: string;
}

// Props interfaces
export interface TaskCardProps {
  task: Task;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface CreateTaskCardProps {
  onClick: () => void;
}

export interface TaskFilterBarProps {
  search: string;
  onSearchChange: (newSearch: string) => void;
  status: string;
  onStatusChange: (newStatus: string) => void;
}

export interface TaskFormProps {
  initialData?: Task;
  onSubmit: (data: TaskFormData) => Promise<void>;
  isUpdating: boolean;
  error?: string | null;
}

// Importing from schema to avoid circular dependencies
import { TaskFormData } from "@/schemas/taskSchema"; 