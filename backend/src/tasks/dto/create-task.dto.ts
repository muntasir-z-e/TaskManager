import { IsDateString, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Complete project',
    description: 'Task title',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Finish implementing the NestJS backend',
    description: 'Task description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'pending',
    description: 'Task status',
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
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