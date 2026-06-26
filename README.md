# Jewelry Shop Management System

A comprehensive web application for managing retail jewelry shop operations including billing, inventory management, client accounts, quotations, and financial accounting.

## Features

### 1. **Billing & Sales Management**
   - Create and manage sales invoices
   - Multiple payment modes (Cash, Card, Cheque, Online)
   - Payment tracking and receipts
   - Sales history and reports

### 2. **Inventory Management**
   - Track gold and silver stock
   - Product creation with automatic barcode/tag generation
   - Stock updates on purchase and sale
   - Batch management

### 3. **Client Account Management**
   - Maintain detailed client profiles
   - Track sales and payment history
   - Credit/due management
   - Client contact information

### 4. **Purchase Management**
   - Record gold and silver purchases from suppliers
   - Track purchase costs
   - Supplier management
   - Purchase invoices and receipts

### 5. **Quotation System**
   - Create quotations for clients (buying/selling)
   - Quote expiry tracking
   - Convert quotes to orders
   - Quote history

### 6. **Money Lending Accounting**
   - Record client loans
   - Track loan details (amount, interest, duration)
   - Payment schedules
   - Loan status tracking
   - Interest calculations

### 7. **Financial Accounting**
   - Profit & Loss statements
   - Cash flow tracking
   - Daily/Monthly/Yearly reports
   - Tax calculations

### 8. **Barcode/Tag System**
   - Auto-generate unique product tags
   - Barcode printing
   - Product identification

## Technology Stack

- **Frontend:** React.js with TypeScript
- **Backend:** Node.js/Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT
- **Report Generation:** PDF export
- **Barcode:** jsBarcode library

## Project Structure

```
├── frontend/               # React application
├── backend/                # Node.js/Express API
├── database/               # Database migrations & schemas
├── docs/                   # Documentation
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository
2. Install backend dependencies: `cd backend && npm install`
3. Install frontend dependencies: `cd frontend && npm install`
4. Configure environment variables
5. Run database migrations
6. Start development server

## Future Enhancements

- Mobile app for on-the-go billing
- Advanced analytics and dashboards
- Multi-branch support
- API integration for e-commerce
- Automated backup systems
- SMS/Email notifications

---

**Last Updated:** 2026-06-26
