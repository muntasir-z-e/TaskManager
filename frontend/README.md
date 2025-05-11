# Task Manager Frontend

A modern, responsive task management application built with Next.js and Material UI.

## Features

- User authentication (signup/login)
- Dashboard with task overview
- Create, edit, and delete tasks
- Filter tasks by status
- Search tasks by title/description
- Form validation with Zod
- Responsive Material UI design

## Tech Stack

- **Next.js** (App Router) - React framework
- **Material UI** - Component library
- **React Query** - Data fetching and state management
- **Zod** - Schema validation
- **js-cookie** - Cookie management
- **jwt-decode** - JWT token parsing
- **react-hook-form** - Form state management
- **TypeScript** - Type safety

## Project Structure

```
src/
├── app/               # Next.js app router pages
│   ├── dashboard/     # Task dashboard
│   ├── login/         # Login page
│   ├── signup/        # Signup page
│   ├── tasks/         # Task management pages
│   └── test-connection/ # API connection test page
├── components/        # Reusable components
│   ├── Auth/          # Authentication components
│   ├── Layout/        # Layout components
│   └── Tasks/         # Task-related components
├── contexts/          # React contexts
│   └── AuthContext.tsx # Authentication context
├── schemas/           # Zod validation schemas
│   └── taskSchema.ts  # Task form validation
├── services/          # API services
│   ├── api.ts         # Base API service
│   └── taskService.ts # Task-specific API service
├── types/             # TypeScript type definitions
│   └── task.ts        # Task-related types
└── middleware.ts      # Next.js middleware for route protection
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file with:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser.


## Authentication

The application uses JWT-based authentication with cookies for session persistence. The `AuthContext` provides:

- User state management
- Login/signup functionality
- Token handling via cookies
- Automatic token validation

## Data Fetching

React Query is used for data fetching, providing:

- Automatic caching
- Background refetching
- Loading and error states
- Optimistic updates
- Mutation handling

## Forms and Validation

Forms are built with:

- React Hook Form for state management
- Zod schemas for validation
- Material UI components for styling
- Controlled inputs for consistent behavior

## Deployment

For deployment instructions, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
