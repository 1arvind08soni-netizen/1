# Developer Guide

## Project Structure

```
jewelry-shop/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/      # Business logic controllers
│   │   ├── middleware/       # Express middleware
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utility functions
│   │   └── index.js         # Server entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
│
├── database/
│   └── schema.sql           # Database schema
│
├── docs/
│   ├── API_DESIGN.md
│   ├── SETUP.md
│   └── FEATURES.md
│
└── README.md
```

## Adding New Features

### 1. Backend - Add New API Endpoint

#### Step 1: Create Controller
Create file: `backend/src/controllers/newFeatureController.js`

```javascript
const pool = require('../config/database');

const getAll = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM table_name');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getAll };
```

#### Step 2: Create Route
Create file: `backend/src/routes/newFeatureRoutes.js`

```javascript
const express = require('express');
const router = express.Router();
const controller = require('../controllers/newFeatureController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, controller.getAll);

module.exports = router;
```

#### Step 3: Register Route in Server
Update `backend/src/index.js`:

```javascript
const featureRoutes = require('./routes/newFeatureRoutes');
app.use('/api/feature', featureRoutes);
```

### 2. Database Changes

To add a new table:
1. Create migration file in `database/migrations/`
2. Add SQL in migration file
3. Run migration: `npm run migrate`

### 3. Frontend - Add New Component

#### Step 1: Create Component
```javascript
// frontend/src/components/Feature.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Feature() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/feature');
        setData(response.data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}

export default Feature;
```

#### Step 2: Add Route in App
```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Feature from './components/Feature';

<Routes>
  <Route path="/feature" element={<Feature />} />
</Routes>
```

## Database Operations

### Connecting to Database
```javascript
const pool = require('./config/database');
const result = await pool.query('SELECT * FROM table');
```

### Insert
```javascript
await pool.query(
  'INSERT INTO table (col1, col2) VALUES ($1, $2)',
  [value1, value2]
);
```

### Update
```javascript
await pool.query(
  'UPDATE table SET col1 = $1 WHERE id = $2',
  [value1, id]
);
```

### Delete
```javascript
await pool.query('DELETE FROM table WHERE id = $1', [id]);
```

## API Response Format

All API endpoints should return:

```javascript
// Success
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}

// Error
{
  "success": false,
  "error": "Error message"
}
```

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Deployment

### Backend Deployment
1. Set environment variables
2. Build: `npm run build`
3. Deploy to server

### Frontend Deployment
1. Build: `npm run build`
2. Deploy to hosting service (Vercel, Netlify, etc.)

## Troubleshooting

### Database Connection Issues
- Check PostgreSQL is running
- Verify credentials in .env
- Check database exists

### API Errors
- Check authentication token
- Verify request format
- Check server logs

### Frontend Issues
- Clear cache: `npm run build`
- Check API URL in .env
- Verify backend is running
