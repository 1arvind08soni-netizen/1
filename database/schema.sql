-- Create database
-- CREATE DATABASE jewelry_shop;

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  role VARCHAR(20) DEFAULT 'user',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clients table
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(100),
  address TEXT,
  city VARCHAR(50),
  state VARCHAR(50),
  pincode VARCHAR(10),
  gst_number VARCHAR(20),
  credit_limit DECIMAL(12, 2) DEFAULT 0,
  current_due DECIMAL(12, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  product_code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  metal_type VARCHAR(20),
  weight DECIMAL(8, 3),
  weight_unit VARCHAR(10),
  purity VARCHAR(10),
  buying_price DECIMAL(12, 2),
  selling_price DECIMAL(12, 2),
  quantity_in_stock DECIMAL(10, 3),
  barcode_data VARCHAR(255),
  image_url VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sales/Invoices table
CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  client_id INTEGER REFERENCES clients(id),
  sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(12, 2),
  tax_amount DECIMAL(12, 2),
  discount_amount DECIMAL(12, 2),
  net_amount DECIMAL(12, 2),
  payment_status VARCHAR(20),
  payment_mode VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sale Items table
CREATE TABLE sale_items (
  id SERIAL PRIMARY KEY,
  sale_id INTEGER REFERENCES sales(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  quantity DECIMAL(10, 3),
  unit_price DECIMAL(12, 2),
  line_total DECIMAL(12, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Purchases table
CREATE TABLE purchases (
  id SERIAL PRIMARY KEY,
  purchase_number VARCHAR(50) UNIQUE NOT NULL,
  supplier_id INTEGER,
  purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(12, 2),
  tax_amount DECIMAL(12, 2),
  discount_amount DECIMAL(12, 2),
  net_amount DECIMAL(12, 2),
  payment_status VARCHAR(20),
  payment_mode VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Purchase Items table
CREATE TABLE purchase_items (
  id SERIAL PRIMARY KEY,
  purchase_id INTEGER REFERENCES purchases(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  quantity DECIMAL(10, 3),
  unit_price DECIMAL(12, 2),
  line_total DECIMAL(12, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quotations table
CREATE TABLE quotations (
  id SERIAL PRIMARY KEY,
  quote_number VARCHAR(50) UNIQUE NOT NULL,
  client_id INTEGER REFERENCES clients(id),
  quote_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expiry_date TIMESTAMP,
  quote_type VARCHAR(20),
  total_amount DECIMAL(12, 2),
  tax_amount DECIMAL(12, 2),
  discount_amount DECIMAL(12, 2),
  net_amount DECIMAL(12, 2),
  status VARCHAR(20),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quote Items table
CREATE TABLE quote_items (
  id SERIAL PRIMARY KEY,
  quote_id INTEGER REFERENCES quotations(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  quantity DECIMAL(10, 3),
  unit_price DECIMAL(12, 2),
  line_total DECIMAL(12, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Loan Accounts table
CREATE TABLE loan_accounts (
  id SERIAL PRIMARY KEY,
  loan_number VARCHAR(50) UNIQUE NOT NULL,
  client_id INTEGER REFERENCES clients(id),
  principal_amount DECIMAL(12, 2),
  interest_rate DECIMAL(5, 2),
  loan_start_date TIMESTAMP,
  loan_end_date TIMESTAMP,
  total_duration_months INTEGER,
  status VARCHAR(20),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Loan Payments table
CREATE TABLE loan_payments (
  id SERIAL PRIMARY KEY,
  loan_id INTEGER REFERENCES loan_accounts(id) ON DELETE CASCADE,
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  principal_paid DECIMAL(12, 2),
  interest_paid DECIMAL(12, 2),
  total_paid DECIMAL(12, 2),
  payment_mode VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Client Payments table
CREATE TABLE client_payments (
  id SERIAL PRIMARY KEY,
  payment_number VARCHAR(50) UNIQUE NOT NULL,
  client_id INTEGER REFERENCES clients(id),
  payment_amount DECIMAL(12, 2),
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  payment_mode VARCHAR(50),
  reference_number VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stock Transactions table
CREATE TABLE stock_transactions (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  transaction_type VARCHAR(50),
  quantity DECIMAL(10, 3),
  reference_type VARCHAR(50),
  reference_id INTEGER,
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_clients_name ON clients(name);
CREATE INDEX idx_clients_phone ON clients(phone);
CREATE INDEX idx_products_code ON products(product_code);
CREATE INDEX idx_products_metal_type ON products(metal_type);
CREATE INDEX idx_sales_client_id ON sales(client_id);
CREATE INDEX idx_sales_date ON sales(sale_date);
CREATE INDEX idx_purchases_date ON purchases(purchase_date);
CREATE INDEX idx_quotations_client_id ON quotations(client_id);
CREATE INDEX idx_quotations_status ON quotations(status);
CREATE INDEX idx_loan_accounts_client_id ON loan_accounts(client_id);
CREATE INDEX idx_loan_payments_loan_id ON loan_payments(loan_id);
