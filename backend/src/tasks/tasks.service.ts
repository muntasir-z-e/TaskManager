import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    // Handle date format conversion
    if (createTaskDto.dueDate) {
      try {
        // If it's just a date string like "2025-05-08", convert it to full ISO
        if (!createTaskDto.dueDate.includes('T')) {
          createTaskDto.dueDate = `${createTaskDto.dueDate}T00:00:00.000Z`;
        }
      } catch (error) {
        // If any error occurs during date conversion, continue with original value
        console.error('Date conversion error:', error);
      }
    }

    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        userId,
      },
    });
  }

  async findAll(userId: string, query?: any) {
    const { status, search } = query || {};
    
    const where: any = { userId };
    
    if (status) {
      where.status = status;
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ];
    }
    
    return this.prisma.task.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    
    if (!task || task.userId !== userId) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string) {
    // Handle date format conversion for updates
    if (updateTaskDto.dueDate) {
      try {
        // If it's just a date string like "2025-05-08", convert it to full ISO
        if (!updateTaskDto.dueDate.includes('T')) {
          updateTaskDto.dueDate = `${updateTaskDto.dueDate}T00:00:00.000Z`;
        }
      } catch (error) {
        // If any error occurs during date conversion, continue with original value
        console.error('Date conversion error:', error);
      }
    }
    
    // Check if task exists and belongs to user
    await this.findOne(id, userId);
    
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: string, userId: string) {
    // Check if task exists and belongs to user
    await this.findOne(id, userId);
    
    return this.prisma.task.delete({
      where: { id },
    });
  }
} 