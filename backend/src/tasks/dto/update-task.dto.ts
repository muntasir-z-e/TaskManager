import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({
    example: 'Updated task title',
    description: 'Task title',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'Updated task description',
    description: 'Task description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'in-progress',
    description: 'Task status',
    enum: ['pending', 'in-progress', 'completed'],
    required: false,
  })
  @IsString()
  @IsIn(['pending', 'in-progress', 'completed'])
  @IsOptional()
  status?: string;

  @ApiProperty({
    example: '2023-12-31T00:00:00.000Z',
    description: 'Task due date',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  dueDate?: string;
} 