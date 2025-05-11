import { Controller, Get, Post, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@ApiBearerAuth('bearerAuth')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiQuery({ name: 'title', required: true, type: String, description: 'Task title' })
  @ApiQuery({ name: 'description', required: false, type: String, description: 'Task description' })
  @ApiQuery({ 
    name: 'status', 
    required: false, 
    enum: ['pending', 'in-progress', 'completed'], 
    description: 'Task status' 
  })
  @ApiQuery({ 
    name: 'dueDate', 
    required: false, 
    type: String, 
    description: 'Task due date in ISO format, e.g., "2025-05-08T00:00:00.000Z". You can use just "2025-05-08" for midnight UTC of that date.' 
  })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(
    @CurrentUser() user: { id: string },
    @Query('title') title: string,
    @Query('description') description?: string,
    @Query('status') status?: string,
    @Query('dueDate') dueDate?: string
  ) {
    const createTaskDto: CreateTaskDto = {
      title,
      description,
      status,
      dueDate
    };
    return this.tasksService.create(createTaskDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Return all tasks' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(@CurrentUser() user: { id: string }, @Query() query: any) {
    return this.tasksService.findAll(user.id, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({ status: 200, description: 'Return the task' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  findOne(@Param('id') id: string, @CurrentUser() user: { id: string }) {
    return this.tasksService.findOne(id, user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiQuery({ name: 'title', required: false, type: String, description: 'Task title' })
  @ApiQuery({ name: 'description', required: false, type: String, description: 'Task description' })
  @ApiQuery({ 
    name: 'status', 
    required: false, 
    enum: ['pending', 'in-progress', 'completed'], 
    description: 'Task status' 
  })
  @ApiQuery({ 
    name: 'dueDate', 
    required: false, 
    type: String, 
    description: 'Task due date in ISO format, e.g., "2025-05-08T00:00:00.000Z". You can use just "2025-05-08" for midnight UTC of that date.' 
  })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  update(
    @Param('id') id: string,
    @CurrentUser() user: { id: string },
    @Query('title') title?: string,
    @Query('description') description?: string,
    @Query('status') status?: string,
    @Query('dueDate') dueDate?: string
  ) {
    const updateTaskDto: UpdateTaskDto = {
      title,
      description,
      status,
      dueDate
    };
    return this.tasksService.update(id, updateTaskDto, user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  remove(@Param('id') id: string, @CurrentUser() user: { id: string }) {
    return this.tasksService.remove(id, user.id);
  }
} 