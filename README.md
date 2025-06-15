# GLAM AND GLOW - Beauty Salon and Store

A full-stack web application for a beauty salon and store, allowing users to book salon services and purchase beauty products.

## Features

- **User Authentication**
  - Sign up, login, and forgot password functionality
  - Session-based authentication

- **Product Store**
  - Browse products by category
  - Search products
  - Add products to cart
  - Checkout process

- **Salon Services**
  - View available salon services
  - Book appointments
  - Manage existing appointments

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, EJS templating
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Express-session with bcryptjs for password hashing
- **Email**: Nodemailer for sending verification codes

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB (local or Atlas connection)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/Shahd-mossa/final-web.git
   cd final-web
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/glamandglow
   JWT_SECRET=your_jwt_secret_key_here
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

4. Seed the database with initial data (OPTIONAL)
   ```
   # To seed the database, first uncomment the seedData() call in seedData.js
   # Then run:
   node seedData.js
   ```

5. Start the server
   ```
   npm start
   ```
   Or for development with auto-restart:
   ```
   npm run dev
   ```

6. Visit `http://localhost:3000` in your browser

## API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `POST /api/users/logout` - Logout user
- `POST /api/users/forgotpassword` - Request password reset code
- `POST /api/users/resetpassword` - Reset password with verification code
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Product Routes
- `GET /api/products` - Get all products or filter by category
- `GET /api/products/:id` - Get single product by ID
- `POST /api/products` - Create new product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Service Routes
- `GET /api/services` - Get all services or filter by category
- `GET /api/services/:id` - Get single service by ID
- `POST /api/services` - Create new service (admin only)
- `PUT /api/services/:id` - Update service (admin only)
- `DELETE /api/services/:id` - Delete service (admin only)

### Appointment Routes
- `POST /api/appointments` - Create new appointment
- `GET /api/appointments` - Get user appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `PUT /api/appointments/:id` - Update appointment
- `PUT /api/appointments/:id/cancel` - Cancel appointment
- `GET /api/appointments/all` - Get all appointments (admin only)

### Order Routes
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/cancel` - Cancel order
- `PUT /api/orders/:id/status` - Update order status (admin only)
- `GET /api/orders/all` - Get all orders (admin only)

## Admin Access

The seed script creates an admin user with the following credentials:
- Email: admin@glamandglow.com
- Password: admin123

## License

This project is licensed under the ISC License.