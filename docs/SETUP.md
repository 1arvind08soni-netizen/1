# Setup Guide - Jewelry Shop Management System

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn
- Git

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/1arvind08soni-netizen/1.git
cd 1
```

### 2. Database Setup

1. Create PostgreSQL database:
```bash
createdb jewelry_shop
```

2. Run the schema:
```bash
psql jewelry_shop < database/schema.sql
```

3. Verify tables are created:
```bash
psql jewelry_shop -c "\dt"
```

### 3. Backend Setup

```bash
cd backend

# Copy environment variables
cp .env.example .env

# Update .env with your configuration
# - DB_HOST, DB_USER, DB_PASSWORD
# - JWT_SECRET (generate a random string)
# - PORT (default: 5000)

# Install dependencies
npm install

# Start development server
npm run dev
```

Backend will run on: `http://localhost:5000`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will open at: `http://localhost:3000`

## Project Structure

```
.
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── index.js     # Server entry point
│   │   ├── routes/      # API routes
│   │   ├── controllers/ # Business logic
│   │   ├── models/      # Database models
│   │   └── middleware/  # Custom middleware
│   ├── package.json
│   └── .env.example
│
├── frontend/             # React application
│   ├── public/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── database/
│   └── schema.sql       # Database schema
│
├── docs/                # Documentation
└── README.md
```

## Environment Variables

### Backend (.env)

```
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=jewelry_shop
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_secret_key_here
JWT_EXPIRY=7d

APP_NAME=Jewelry Shop Management System
```

## Development Workflow

1. **Start PostgreSQL**:
```bash
# Linux/Mac
brew services start postgresql

# Windows
# Use PostgreSQL installer or pgAdmin
```

2. **Terminal 1 - Backend**:
```bash
cd backend
npm run dev
```

3. **Terminal 2 - Frontend**:
```bash
cd frontend
npm start
```

4. Open browser to `http://localhost:3000`

## Database Migrations

To run migrations:
```bash
cd backend
npm run migrate
```

## API Documentation

API endpoints will be documented in `docs/API.md`

Common endpoints:
- `GET /` - Health check
- `GET /health` - Server status

## Troubleshooting

### Database Connection Error

1. Verify PostgreSQL is running
2. Check database credentials in `.env`
3. Ensure `jewelry_shop` database exists

### Port Already in Use

Change PORT in `.env` or kill process using the port:
```bash
# Linux/Mac
lsof -ti:5000 | xargs kill

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

## Next Steps

1. Create database models and controllers
2. Implement authentication system
3. Build API endpoints for each feature
4. Create React components for UI
5. Implement payment integration
6. Add reporting features

## Support

For issues, create an issue on GitHub or contact the development team.
