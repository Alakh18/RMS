# RentalEco RMS

RentalEco RMS is a full‑stack rental marketplace platform where customers can explore products, place rental orders, and track their order history. Vendors can manage inventory, quotations, invoices, and reports through a dedicated dashboard.

## Highlights

- Modern, responsive UI with dark mode support
- Product discovery, details, cart, and checkout flows
- Order history and confirmation pages for customers
- Vendor dashboard with products, orders, invoices, quotations, and reports
- Authentication and role-based access for users and vendors

## Project Structure

- frontend/ — React + Vite client app
- backend/ — Node.js API with Prisma ORM

## Tech Stack

**Frontend**
- React, Vite, React Router
- Tailwind CSS

**Backend**
- Node.js, Express
- Prisma ORM
- SQLite/PostgreSQL (via Prisma configuration)

## Key Pages

**Customer**
- Home, Products, Product Details
- Cart, Checkout, Payment
- Order Confirmation, Orders History
- Profile, Edit Profile, Terms, About, Contact

**Vendor**
- Dashboard, Products, Orders
- Quotations, Invoices, Reports
- Pickups, Returns, Settings

## Getting Started

### 1) Backend Setup

1. Go to backend/ and install dependencies
2. Configure your database in backend/prisma/schema.prisma
3. Run Prisma migrations and seed data
4. Start the API server

### 2) Frontend Setup

1. Go to frontend/ and install dependencies
2. Start the Vite dev server

> The frontend expects the backend API to be running.

## Environment Variables

Create a .env file in backend/ with the required database and app settings.

Common keys:
- DATABASE_URL
- PORT

## Scripts

Check each package.json for available scripts.

- frontend/package.json
- backend/package.json

## Dark Mode

The UI includes comprehensive dark mode styling for a consistent visual experience across all major pages.

## License

This project was built for a hackathon and is intended for educational/demo purposes.
