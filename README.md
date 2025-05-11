# Task Manager App

A full-stack task management application built with Next.js and NestJS.

## Features

- **User Authentication**
  - Secure signup and login
  - JWT-based authentication
  - Route protection
  - Cookie-based token storage

- **Task Management**
  - Create, read, update, delete tasks
  - Filter tasks by status
  - Search tasks by title/description
  - Task categorization by status

- **User Experience**
  - Responsive UI with Material UI
  - Form validation with Zod
  - Immediate feedback on actions
  - Loading states and error handling

- **Developer Experience**
  - TypeScript for type safety
  - Clean code architecture
  - Modular component design
  - Comprehensive API documentation

## Tech Stack

### Frontend
- **Next.js** (App Router) - React framework
- **Material UI** - Component library
- **React Query** - Data fetching and state management
- **Zod** - Form validation
- **TypeScript** - Type safety
- **React Hook Form** - Form state management
- **js-cookie** - Cookie management
- **jwt-decode** - Token parsing

### Backend
- **NestJS** - Backend framework
- **Prisma ORM** - Database access
- **PostgreSQL** - Database (via neon.tech)
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Swagger** - API documentation
- **Class Validator** - Request validation

## Project Structure

```
TaskManager/
├── frontend/               # Next.js frontend application
│   ├── src/
│   │   ├── app/            # Next.js pages and routes
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts
│   │   ├── schemas/        # Zod validation schemas
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript interfaces
│   │   └── middleware.ts   # Next.js middleware
│   └── public/             # Static assets
├── backend/                # NestJS backend application
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── tasks/          # Tasks module
│   │   ├── users/          # Users module
│   │   ├── app.module.ts   # Main application module
│   │   └── main.ts         # Application entry point
│   └── prisma/             # Prisma schema and migrations
└── README.md               # Project documentation
```

## Setup and Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database (or a Neon.tech account for cloud hosting)

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd TaskManager/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables (create a `.env` file):
   ```
   DATABASE_URL="postgresql://your-username:your-password@your-host:5432/your-db"
   JWT_SECRET="your-secret-key"
   ```
   For local development, you can use SQLite:
   ```
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-secret-key"
   ```

4. Generate Prisma client and run migrations:
   ```
   npx prisma generate
   npx prisma migrate dev
   ```

5. Start the backend server:
   ```
   npm run start:dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd TaskManager/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables (create a `.env.local` file):
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. Start the frontend development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3001](http://localhost:3001) in your browser.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/profile` - Get current user profile (protected)

### Tasks
- `GET /api/tasks` - List all tasks (with optional filters)
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PATCH /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## API Documentation

When the backend server is running, you can access the Swagger documentation at:
```
http://localhost:3000/api/docs
```

## Data Flow Architecture

1. **User Authentication**:
   - Frontend sends credentials to backend
   - Backend validates and returns JWT token
   - Frontend stores token in cookies
   - Frontend includes token in subsequent requests

2. **Data Fetching**:
   - React Query manages API calls and caching
   - API service adds authentication headers
   - NestJS controllers handle requests
   - Prisma ORM interacts with the database
   - Data is returned to the frontend

3. **Form Submission**:
   - Zod validates form data
   - React Hook Form manages form state
   - Data is sent to the backend
   - Backend validates the request
   - Database is updated
   - Response is sent back to frontend

## Deployment Considerations

For production deployment:
- Set up a production PostgreSQL database (e.g., via neon.tech)
- Configure appropriate CORS settings
- Use environment variables for all sensitive information
- Implement proper logging and monitoring
- Consider using a CI/CD pipeline for automated deployments

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 