# API Design & Endpoints

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "username": "user@example.com",
  "email": "user@example.com",
  "password": "password123",
  "full_name": "John Doe",
  "role": "user"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "user@example.com",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "user"
  }
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "user@example.com",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "user"
  }
}
```

## Clients

### Get All Clients
```http
GET /clients?page=1&limit=20
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Client Name",
      "phone": "9876543210",
      "email": "client@example.com",
      "address": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001",
      "gst_number": "27AABCT1234H1Z0",
      "credit_limit": 100000,
      "current_due": 5000,
      "created_at": "2026-06-26T00:00:00Z"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 20
}
```

### Create Client
```http
POST /clients
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Client",
  "phone": "9876543210",
  "email": "client@example.com",
  "address": "123 Main St",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "gst_number": "27AABCT1234H1Z0",
  "credit_limit": 100000
}

Response (201):
{
  "success": true,
  "data": {
    "id": 2,
    "name": "New Client",
    "phone": "9876543210",
    ...
  }
}
```

### Get Client by ID
```http
GET /clients/:id
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Client Name",
    ...
  }
}
```

### Update Client
```http
PUT /clients/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "phone": "9876543210",
  ...
}

Response (200):
{
  "success": true,
  "data": { ... }
}
```

### Delete Client
```http
DELETE /clients/:id
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Client deleted successfully"
}
```

## Products

### Get All Products
```http
GET /products?page=1&limit=20
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "product_code": "PROD-ABC123",
      "name": "Gold Ring",
      "description": "18K Gold Ring",
      "metal_type": "gold",
      "weight": 5.5,
      "weight_unit": "gm",
      "purity": 750,
      "buying_price": 5000,
      "selling_price": 6000,
      "quantity_in_stock": 10,
      "barcode_data": "BC-1234567890",
      "status": "active"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 20
}
```

### Create Product
```http
POST /products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Gold Necklace",
  "description": "18K Gold Necklace",
  "metal_type": "gold",
  "weight": 15,
  "weight_unit": "gm",
  "purity": 750,
  "buying_price": 15000,
  "selling_price": 18000
}

Response (201):
{
  "success": true,
  "data": {
    "id": 2,
    "product_code": "PROD-XYZ789",
    "barcode_data": "BC-9876543210",
    ...
  }
}
```

### Get Product by Barcode
```http
GET /products/barcode/:barcode
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": { ... }
}
```

## Sales

### Create Sale
```http
POST /sales
Authorization: Bearer <token>
Content-Type: application/json

{
  "client_id": 1,
  "items": [
    {
      "product_id": 1,
      "quantity": 2,
      "unit_price": 6000
    },
    {
      "product_id": 2,
      "quantity": 1,
      "unit_price": 18000
    }
  ],
  "tax_amount": 4320,
  "discount_amount": 2000,
  "payment_mode": "cash",
  "notes": "Customer paid in cash"
}

Response (201):
{
  "success": true,
  "data": {
    "id": 1,
    "invoice_number": "INV-1234567890",
    "client_id": 1,
    "total_amount": 30000,
    "tax_amount": 4320,
    "discount_amount": 2000,
    "net_amount": 32320,
    "payment_status": "pending",
    "payment_mode": "cash"
  }
}
```

### Get All Sales
```http
GET /sales?page=1&limit=20
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": [ ... ],
  "total": 150,
  "page": 1,
  "limit": 20
}
```

### Get Sale by ID
```http
GET /sales/:id
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "id": 1,
    "invoice_number": "INV-1234567890",
    "items": [
      {
        "id": 1,
        "product_id": 1,
        "quantity": 2,
        "unit_price": 6000,
        "line_total": 12000
      }
    ],
    ...
  }
}
```

## Quotations

### Create Quotation
```http
POST /quotations
Authorization: Bearer <token>
Content-Type: application/json

{
  "client_id": 1,
  "quote_type": "selling",
  "items": [
    {
      "product_id": 1,
      "quantity": 5,
      "unit_price": 6000
    }
  ],
  "expiry_date": "2026-07-26"
}

Response (201):
{
  "success": true,
  "data": {
    "id": 1,
    "quote_number": "QT-1234567890",
    "client_id": 1,
    "total_amount": 30000,
    "tax_amount": 5400,
    "net_amount": 35400,
    "status": "pending"
  }
}
```

### Update Quotation Status
```http
PUT /quotations/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "accepted"
}

Response (200):
{
  "success": true,
  "data": { ... }
}
```

## Loans

### Create Loan
```http
POST /loans
Authorization: Bearer <token>
Content-Type: application/json

{
  "client_id": 1,
  "principal_amount": 500000,
  "interest_rate": 12,
  "loan_start_date": "2026-06-26",
  "total_duration_months": 12
}

Response (201):
{
  "success": true,
  "data": {
    "id": 1,
    "loan_number": "LN-1234567890",
    "client_id": 1,
    "principal_amount": 500000,
    "interest_rate": 12,
    "status": "active"
  }
}
```

### Record Loan Payment
```http
POST /loans/:id/payments
Authorization: Bearer <token>
Content-Type: application/json

{
  "principal_paid": 50000,
  "interest_paid": 5000,
  "payment_date": "2026-07-26",
  "payment_mode": "bank_transfer"
}

Response (201):
{
  "success": true,
  "data": {
    "id": 1,
    "loan_id": 1,
    "principal_paid": 50000,
    "interest_paid": 5000,
    "total_paid": 55000
  }
}
```

### Get Loan Balance
```http
GET /loans/:id/balance
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "loan_id": 1,
    "principal_amount": 500000,
    "principal_paid": 50000,
    "principal_remaining": 450000,
    "interest_rate": 12,
    "interest_paid": 5000,
    "status": "active"
  }
}
```

## Reports

### Get Daily Summary
```http
GET /reports/daily-summary
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "date": "2026-06-26",
    "sales": {
      "total_sales": 5,
      "total_amount": 150000
    },
    "purchases": {
      "total_purchases": 2,
      "total_amount": 100000
    },
    "payments": {
      "total_payments": 75000
    }
  }
}
```

### Get Sales Summary
```http
GET /reports/sales-summary?start_date=2026-05-26&end_date=2026-06-26
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "total_sales": 50,
    "total_amount": 1500000,
    "total_tax": 270000,
    "net_total": 1770000
  }
}
```

### Get Inventory Report
```http
GET /reports/inventory
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "products": [ ... ],
    "summary": {
      "total_stock_value": 5000000,
      "gold_stock_value": 3500000,
      "silver_stock_value": 1500000,
      "total_items": 250
    }
  }
}
```

### Get Client Ledger
```http
GET /reports/client-ledger/:client_id
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "client": { ... },
    "transactions": [ ... ],
    "payments": [ ... ]
  }
}
```

## Error Responses

### Unauthorized (401)
```json
{
  "success": false,
  "error": "No token provided"
}
```

### Not Found (404)
```json
{
  "success": false,
  "error": "Client not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "error": "Internal server error"
}
```

## Rate Limiting

API endpoints are rate-limited to 100 requests per minute per IP address.

## Pagination

Endpoints supporting pagination use `page` and `limit` query parameters:
- `page` (default: 1) - Page number
- `limit` (default: 20) - Items per page (max: 100)

## Filtering & Sorting

Supported query parameters vary by endpoint. Check specific endpoint documentation.
