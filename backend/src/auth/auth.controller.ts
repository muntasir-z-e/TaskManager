import { Body, Controller, Get, Post, Query, UseGuards, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiQuery({ name: 'email', required: true, type: String, description: 'User email address' })
  @ApiQuery({ name: 'password', required: true, type: String, description: 'User password (min 6 characters)' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  signup(@Query('email') queryEmail: string, @Query('password') queryPassword: string, @Body() body: any) {
    // Extract credentials from either query params or request body
    const email = queryEmail || (body && body.email);
    const password = queryPassword || (body && body.password);
    
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }
    
    const signupDto: SignupDto = { email, password };
    return this.authService.signup(signupDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with credentials' })
  @ApiQuery({ name: 'email', required: true, type: String, description: 'User email address' })
  @ApiQuery({ name: 'password', required: true, type: String, description: 'User password' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  login(@Query('email') queryEmail: string, @Query('password') queryPassword: string, @Body() body: any) {
    // Extract credentials from either query params or request body
    const email = queryEmail || (body && body.email);
    const password = queryPassword || (body && body.password);
    
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }
    
    try {
      const loginDto: LoginDto = { email, password };
      return this.authService.login(loginDto);
    } catch (error) {
      throw error;
    }
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('bearerAuth')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Return user profile' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProfile(@CurrentUser() user: { id: string; email: string }) {
    return this.authService.getProfile(user.id);
  }
} 