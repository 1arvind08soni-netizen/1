# API Design - Jewelry Shop Management System

## Authentication Endpoints

### POST /api/auth/register
Register new user account

**Request:**
```json
{
  "username": "user123",
  "email": "user@example.com",
  "password": "secure_password",
  "full_name": "John Doe",
  "role": "manager"
}
```

**Response:** 201 Created
```json
{
  "id": 1,
  "username": "user123",
  "email": "user@example.com",
  "full_name": "John Doe",
  "token": "jwt_token_here"
}
```

### POST /api/auth/login
Login user

**Request:**
```json
{
  "username": "user123",
  "password": "secure_password"
}
```

**Response:** 200 OK
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "user123",
    "email": "user@example.com",
    "role": "manager"
  }
}
```

---

## Client Management Endpoints

### GET /api/clients
Get all clients

**Response:** 200 OK
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "ABC Jewelry Shop",
      "phone": "9876543210",
      "email": "contact@abc.com",
      "credit_limit": 50000,
      "current_due": 5000
    }
  ],
  "total": 10,
  "page": 1
}
```

### POST /api/clients
Create new client

**Request:**
```json
{
  "name": "XYZ Jewelry",
  "phone": "9876543210",
  "email": "xyz@example.com",
  "address": "123 Main St",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400001",
  "credit_limit": 100000
}
```

**Response:** 201 Created

### GET /api/clients/:id
Get client details

### PUT /api/clients/:id
Update client information

### DELETE /api/clients/:id
Delete client

---

## Product/Inventory Endpoints

### GET /api/products
Get all products with stock

### POST /api/products
Create new product

**Request:**
```json
{
  "name": "Gold Ring",
  "metal_type": "gold",
  "weight": 5.5,
  "weight_unit": "grams",
  "purity": "22K",
  "buying_price": 5500,
  "selling_price": 6000
}
```

### GET /api/products/barcode/:barcode
Get product by barcode

### PUT /api/products/:id
Update product

### GET /api/inventory/stock-report
Get inventory stock report

### POST /api/inventory/adjust-stock
Adjust stock for a product

---

## Sales/Billing Endpoints

### POST /api/sales
Create new sale/invoice

**Request:**
```json
{
  "client_id": 1,
  "items": [
    {
      "product_id": 1,
      "quantity": 2,
      "unit_price": 6000
    }
  ],
  "tax_amount": 2160,
  "discount_amount": 1000,
  "payment_mode": "cash",
  "notes": "Sale from store"
}
```

**Response:** 201 Created
```json
{
  "id": 1,
  "invoice_number": "INV-2024-001",
  "client_id": 1,
  "net_amount": 13160,
  "payment_status": "pending"
}
```

### GET /api/sales
List all sales

### GET /api/sales/:id
Get sale details

### GET /api/sales/:id/print
Get printable invoice

### PUT /api/sales/:id/payment-status
Update payment status

---

## Purchase Endpoints

### POST /api/purchases
Create new purchase

**Request:**
```json
{
  "supplier_id": 1,
  "items": [
    {
      "product_id": 1,
      "quantity": 10,
      "unit_price": 5000
    }
  ],
  "tax_amount": 1800,
  "discount_amount": 500,
  "payment_mode": "bank_transfer"
}
```

### GET /api/purchases
List all purchases

### GET /api/purchases/:id
Get purchase details

---

## Quotation Endpoints

### POST /api/quotations
Create new quotation

**Request:**
```json
{
  "client_id": 1,
  "quote_type": "sell",
  "items": [
    {
      "product_id": 1,
      "quantity": 3,
      "unit_price": 6000
    }
  ],
  "expiry_date": "2024-12-31"
}
```

### GET /api/quotations
List all quotations

### GET /api/quotations/:id
Get quotation details

### PUT /api/quotations/:id/status
Update quotation status (accepted, rejected, expired)

### POST /api/quotations/:id/convert-to-sale
Convert quotation to sale

---

## Loan Management Endpoints

### POST /api/loans
Create new loan account

**Request:**
```json
{
  "client_id": 1,
  "principal_amount": 100000,
  "interest_rate": 12.5,
  "loan_start_date": "2024-01-01",
  "total_duration_months": 12
}
```

### GET /api/loans
List all loans

### GET /api/loans/:id
Get loan details

### POST /api/loans/:id/payments
Record loan payment

**Request:**
```json
{
  "principal_paid": 8333.33,
  "interest_paid": 1041.67,
  "payment_date": "2024-02-01",
  "payment_mode": "cash"
}
```

### GET /api/loans/:id/balance
Get outstanding loan balance

---

## Payment Endpoints

### POST /api/payments
Record client payment

**Request:**
```json
{
  "client_id": 1,
  "payment_amount": 5000,
  "payment_mode": "bank_transfer",
  "reference_number": "TXN123456"
}
```

### GET /api/payments
List all payments

### GET /api/clients/:id/payment-history
Get payment history for client

---

## Reports Endpoints

### GET /api/reports/sales-summary
Get sales summary report

### GET /api/reports/inventory
Get inventory report

### GET /api/reports/client-ledger/:client_id
Get client ledger

### GET /api/reports/daily-summary
Get daily financial summary

### GET /api/reports/monthly-summary
Get monthly financial summary

### GET /api/reports/profit-loss
Get profit and loss report

---

## Barcode Endpoints

### POST /api/barcodes/generate
Generate barcode for product

**Request:**
```json
{
  "product_id": 1,
  "format": "CODE128"
}
```

### GET /api/barcodes/:product_id/print
Print barcode label

---

## Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message here",
  "code": "ERROR_CODE",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

## Success Response Format

```json
{
  "success": true,
  "data": {},
  "message": "Operation successful",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

---

## Authentication

All protected endpoints require JWT token in header:
```
Authorization: Bearer <jwt_token>
```

## Rate Limiting

- 100 requests per minute per IP
- 10 failed login attempts = temporary block

## Pagination

List endpoints support:
- `page` (default: 1)
- `limit` (default: 20, max: 100)
- `sort` (field name, prefix with `-` for descending)

Example: `/api/sales?page=2&limit=50&sort=-sale_date`
