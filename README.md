# Jewelry Shop Management System

## Overview

A comprehensive full-stack web application for managing jewelry shop operations including billing, inventory management, client accounts, money lending, and financial reports.

**Live Demo:** Coming Soon

## Features

✨ **Key Features:**
- 💰 **Billing & Sales Management** - Create and manage sales invoices with payment tracking
- 📦 **Inventory Management** - Track gold and silver stock with real-time updates
- 👥 **Client Account Management** - Maintain detailed client profiles with payment history
- 📝 **Quotation System** - Create and manage quotations with expiry tracking
- 💳 **Money Lending Accounting** - Complete loan management with payment schedules
- 📊 **Financial Reports** - Sales, inventory, and profit/loss reports
- 🏷️ **Automatic Barcode Generation** - Generate unique product tags
- 🔐 **User Authentication** - JWT-based authentication with role-based access

## Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT
- **Password Encryption:** bcryptjs

### Frontend
- **Library:** React 18
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Barcode:** JsBarcode
- **PDF Generation:** jsPDF + html2canvas
- **Notifications:** React-toastify

## Project Structure

```
jewelry-shop/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Business logic
│   │   ├── middleware/     # Auth & custom middleware
│   │   ├── routes/         # API endpoints
│   │   ├── utils/          # Utilities
│   │   └── index.js        # Server entry point
│   ├── package.json
│   └── .env.example
├── frontend/                # React application
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
├── database/
│   └── schema.sql          # Database schema
├── docs/
│   ├── API_DESIGN.md       # API endpoints documentation
│   ├── SETUP.md            # Installation guide
│   ├── FEATURES.md         # Feature documentation
│   └── DEVELOPER_GUIDE.md  # Development guide
└── README.md
```

## Quick Start

### Prerequisites
- Node.js v16+
- PostgreSQL v12+
- npm or yarn
- Git

### Installation

1. **Clone Repository**
```bash
git clone https://github.com/1arvind08soni-netizen/1.git
cd 1
```

2. **Database Setup**
```bash
# Create database
creatdb jewelry_shop

# Run schema
psql jewelry_shop < database/schema.sql
```

3. **Backend Setup**
```bash
cd backend
cp .env.example .env
# Edit .env with your credentials
npm install
npm run dev
```

Backend runs on `http://localhost:5000`

4. **Frontend Setup**
```bash
cd frontend
cp .env.example .env
npm install
npm start
```

Frontend opens at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Clients
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Create new client
- `GET /api/clients/:id` - Get client details
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `GET /api/products/:id` - Get product details
- `GET /api/products/barcode/:barcode` - Get product by barcode
- `PUT /api/products/:id` - Update product

### Sales
- `GET /api/sales` - Get all sales
- `POST /api/sales` - Create new sale
- `GET /api/sales/:id` - Get sale details

### Quotations
- `GET /api/quotations` - Get all quotations
- `POST /api/quotations` - Create quotation
- `PUT /api/quotations/:id/status` - Update quotation status

### Loans
- `GET /api/loans` - Get all loans
- `POST /api/loans` - Create loan
- `POST /api/loans/:id/payments` - Record payment
- `GET /api/loans/:id/balance` - Get loan balance

### Reports
- `GET /api/reports/daily-summary` - Daily summary
- `GET /api/reports/sales-summary` - Sales summary
- `GET /api/reports/inventory` - Inventory report
- `GET /api/reports/client-ledger/:id` - Client ledger

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
JWT_SECRET=your_secret_key
JWT_EXPIRY=7d
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Documentation

- [API Design](docs/API_DESIGN.md) - Detailed API endpoints
- [Setup Guide](docs/SETUP.md) - Installation instructions
- [Features](docs/FEATURES.md) - Feature documentation
- [Developer Guide](docs/DEVELOPER_GUIDE.md) - Development guidelines

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## Roadmap

- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] SMS integration
- [ ] Payment gateway integration
- [ ] API documentation (Swagger)
- [ ] Unit & integration tests

## Troubleshooting

### Database Connection Failed
- Ensure PostgreSQL is running
- Verify credentials in .env
- Check database exists: `psql -l`

### Port Already in Use
```bash
# Find and kill process
lsof -ti:5000 | xargs kill -9
```

### Module Not Found
```bash
# Clear and reinstall
rm -rf node_modules
npm install
```

## License

MIT License - See LICENSE file for details

## Support

For issues and questions:
- 📧 Email: support@jewelryshop.com
- 🐛 Issues: [GitHub Issues](https://github.com/1arvind08soni-netizen/1/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/1arvind08soni-netizen/1/discussions)

## Author

**Arvind Soni**
- GitHub: [@1arvind08soni-netizen](https://github.com/1arvind08soni-netizen)
- Email: 1arvind08soni@gmail.com

---

**Built with ❤️ for jewelry shop owners**

*Last Updated: June 26, 2026*