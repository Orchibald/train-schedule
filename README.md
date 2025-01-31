# Train Schedule Project

This project is a full-stack application for managing train schedules.

## Link
[https://train-frontend-smoky.vercel.app/]

SERVER_URL=https://train-backend-production-a712.up.railway.app

## Clone the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/Orchibald/train-schedule.git
```

## Frontend Setup

The frontend is built using Next.js, React Query, and other modern tools. Follow the steps below to run the client side.

### Steps to run locally:

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

### Environment Variables for Frontend

In the `frontend` directory, create a `.env.local` file and set the following environment variable:

```env
SERVER_URL=http://example.com
```

Replace `http://example.com` with the URL of your deployed backend or use `http://localhost:3030` if running locally.

## Backend Setup

The backend is built with NestJS and Prisma. To run it locally, follow these steps:

### Steps to run locally:

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Connect to the PostgreSQL database and apply migrations. Ensure that you have PostgreSQL running locally or have configured your database URL in `.env`:

   Run the migration:
   ```bash
   prisma migrate dev --name initial-migration
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Environment Variables for Backend

In the `backend` directory, create a `.env` file and set the following environment variables:

```env
PORT=3030
DATABASE_URL="postgresql://postgres:admin@localhost:5432/train-schedule-db?schema=public"
SENDGRID_API_KEY=some-key
FROM_EMAIL=example@gmail.com
JWT_SECRET=some-secret-key
```

Make sure to replace the values with your actual database credentials and API keys.

## Deployment

The backend is deployed on Railway. Once the environment variables are configured properly and the backend is up and running locally.

## Built With

- **Frontend**:
  - Next.js
  - React Query
  - TypeScript
  - Tailwind CSS
  - Zustand
  - Axios

- **Backend**:
  - NestJS
  - TypeScript
  - Prisma
  - JWT
  - PassportJS

