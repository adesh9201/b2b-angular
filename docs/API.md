# FabHub API Documentation

## Overview

FabHub provides a comprehensive REST API for managing B2B marketplace operations including products, vendors, orders, and user management.

## Base URL

- **Development**: `http://localhost:3000/api`
- **Staging**: `https://staging-api.fabhub.com/api`
- **Production**: `https://api.fabhub.com/api`

## Authentication

All API endpoints require authentication using JWT tokens.

### Headers

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## Endpoints

### Authentication

#### POST /auth/login
Login user and get access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "customer"
  }
}
```

#### POST /auth/register
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "role": "customer"
}
```

#### POST /auth/refresh
Refresh access token.

**Request Body:**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Products

#### GET /products
Get list of products with pagination and filtering.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `category` (string): Filter by category
- `search` (string): Search term
- `sort` (string): Sort field (price, name, created_at)
- `order` (string): Sort order (asc, desc)

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Cotton Fabric",
      "description": "High quality cotton fabric",
      "price": 25.99,
      "category": "fabric",
      "vendor_id": 1,
      "images": ["image1.jpg", "image2.jpg"],
      "in_stock": true,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 20,
    "total": 100,
    "last_page": 5
  }
}
```

#### GET /products/:id
Get product details by ID.

#### POST /products
Create a new product (vendor only).

#### PUT /products/:id
Update product (vendor only).

#### DELETE /products/:id
Delete product (vendor only).

### Vendors

#### GET /vendors
Get list of vendors.

#### GET /vendors/:id
Get vendor details.

#### GET /vendors/:id/products
Get products by vendor.

### Orders

#### GET /orders
Get user's orders.

#### POST /orders
Create a new order.

**Request Body:**
```json
{
  "items": [
    {
      "product_id": 1,
      "quantity": 2,
      "price": 25.99
    }
  ],
  "shipping_address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "US"
  }
}
```

#### GET /orders/:id
Get order details.

#### PUT /orders/:id/status
Update order status (vendor only).

### Cart

#### GET /cart
Get user's cart.

#### POST /cart/items
Add item to cart.

#### PUT /cart/items/:id
Update cart item quantity.

#### DELETE /cart/items/:id
Remove item from cart.

#### DELETE /cart
Clear cart.

### Categories

#### GET /categories
Get product categories.

#### GET /categories/:id
Get category details.

#### GET /categories/:id/products
Get products in category.

## Error Responses

All error responses follow this format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "email": ["Email is required"],
      "password": ["Password must be at least 8 characters"]
    }
  }
}
```

### Error Codes

- `VALIDATION_ERROR`: Input validation failed
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `CONFLICT`: Resource already exists
- `RATE_LIMITED`: Too many requests
- `SERVER_ERROR`: Internal server error

## Rate Limiting

API requests are rate limited:
- **Authenticated users**: 1000 requests per hour
- **Unauthenticated users**: 100 requests per hour

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Webhooks

FabHub supports webhooks for real-time notifications:

### Events

- `order.created`
- `order.updated`
- `order.cancelled`
- `payment.completed`
- `product.updated`

### Webhook Payload

```json
{
  "event": "order.created",
  "data": {
    "order_id": 123,
    "customer_id": 456,
    "total": 99.99
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## SDKs

Official SDKs are available for:
- JavaScript/TypeScript
- Python
- PHP
- Java

## Support

For API support:
- **Email**: api-support@fabhub.com
- **Documentation**: https://docs.fabhub.com
- **Status Page**: https://status.fabhub.com