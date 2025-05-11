<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Task Manager API

This is the backend API for the Task Manager application, built with NestJS, Prisma ORM, and PostgreSQL.

## Features

- User authentication with JWT
- CRUD operations for tasks
- Task filtering and searching
- API documentation with Swagger
- Clean architecture with modular design

## Tech Stack

- **NestJS** - Backend framework
- **Prisma ORM** - Database access
- **PostgreSQL** - Database (with SQLite option for development)
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Swagger** - API documentation
- **TypeScript** - Type safety
- **Class Validator** - Request validation

## Project Structure

```
src/
├── auth/             # Authentication module
│   ├── controllers/  # Auth endpoints
│   ├── decorators/   # Custom decorators
│   ├── dto/          # Data transfer objects
│   ├── guards/       # Auth guards
│   └── services/     # Auth business logic
├── tasks/            # Tasks module
│   ├── controllers/  # Task endpoints
│   ├── dto/          # Data transfer objects
│   └── services/     # Task business logic
├── users/            # Users module
│   ├── dto/          # Data transfer objects
│   └── service/      # User business logic
├── app.module.ts     # Main application module
└── main.ts           # Application entry point
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/profile` - Get current user profile (JWT protected)

### Tasks

- `GET /api/tasks` - Get all tasks (JWT protected)
- `POST /api/tasks` - Create a new task (JWT protected)
- `GET /api/tasks/:id` - Get a task by ID (JWT protected)
- `PATCH /api/tasks/:id` - Update a task (JWT protected)
- `DELETE /api/tasks/:id` - Delete a task (JWT protected)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file with:

```
# Local development with SQLite
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-jwt-secret-key-here"

# For production with PostgreSQL (neon.tech)
# DATABASE_URL="postgresql://user:password@your-neon-tech-instance.neon.tech/taskmanager?sslmode=require"
```

3. Generate Prisma client:

```bash
npx prisma generate
```

4. Run migrations:

```bash
npx prisma migrate dev
```

5. Start the server:

```bash
# development
npm run start:dev

# production
npm run start:prod
```

## Swagger Documentation

Once the server is running, access the API documentation at:

```
http://localhost:3000/api/docs
```

## Authentication Flow

1. User registers with email/password
2. Password is hashed with bcrypt
3. User logs in and receives JWT token
4. Token is sent with subsequent requests
5. JwtAuthGuard validates token for protected routes

## Task Management

Tasks include the following properties:
- id: Unique identifier
- title: Task title
- description: Optional task description
- status: Task status (pending, in_progress, completed)
- dueDate: Optional due date
- createdAt: Creation timestamp
- updatedAt: Last update timestamp
- userId: Owner of the task

## Security

- Passwords are hashed using bcrypt
- JWT tokens are signed with a secret key
- Role-based access control ensures users only access their own tasks
- Input validation prevents malicious data

## Deployment

For deployment, consider:
- Setting up a production-ready PostgreSQL database (e.g., neon.tech)
- Using environment variables for configuration
- Implementing proper logging and monitoring
- Setting appropriate CORS headers for your frontend domain

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
