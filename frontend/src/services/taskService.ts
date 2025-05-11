import api from './api';
import { Task, CreateTaskDto, UpdateTaskDto } from '@/types/task';

// Define the query params interface
interface TaskQueryParams {
  status?: string;
  search?: string;
}

// Task service functions
const getTasks = async (params: TaskQueryParams = {}): Promise<Task[]> => {
  const queryParams = new URLSearchParams();
  
  if (params.status) {
    queryParams.append("status", params.status);
  }
  
  if (params.search) {
    queryParams.append("search", params.search);
  }
  
  const queryString = queryParams.toString();
  const url = queryString ? `/api/tasks?${queryString}` : "/api/tasks";
  
  return api.get<Task[]>(url);
};

const getTaskById = async (id: string): Promise<Task> => {
  return api.get<Task>(`/api/tasks/${id}`);
};

const createTask = async (taskData: CreateTaskDto): Promise<Task> => {
  // Convert to Record<string, unknown> to satisfy the API type
  const data: Record<string, unknown> = { ...taskData };
  return api.post<Task>("/api/tasks", data);
};

const updateTask = async (id: string, taskData: UpdateTaskDto): Promise<Task> => {
  // Convert to Record<string, unknown> to satisfy the API type
  const data: Record<string, unknown> = { ...taskData };
  return api.patch<Task>(`/api/tasks/${id}`, data);
};

const deleteTask = async (id: string): Promise<void> => {
  return api.delete(`/api/tasks/${id}`);
};

export const taskService = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
}; 