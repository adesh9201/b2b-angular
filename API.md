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

## API Endpoints

### Authentication

#### POST /auth/login
Login user and get JWT token.

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
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "buyer"
  }
}
```

#### POST /auth/register
Register new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "role": "buyer"
}
```

#### POST /auth/refresh
Refresh JWT token.

### Products

#### GET /products
Get list of products with pagination and filtering.

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `category` (string): Filter by category
- `search` (string): Search term
- `minPrice` (number): Minimum price
- `maxPrice` (number): Maximum price
- `sort` (string): Sort field (price, name, date)
- `order` (string): Sort order (asc, desc)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "product_id",
      "name": "Cotton Fabric",
      "description": "High quality cotton fabric",
      "price": 25.99,
      "category": "cotton",
      "vendor": {
        "id": "vendor_id",
        "name": "Fabric Supplier"
      },
      "images": ["image1.jpg", "image2.jpg"],
      "stock": 100,
      "rating": 4.5,
      "reviews": 25
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

#### GET /products/:id
Get product details by ID.

#### POST /products
Create new product (vendor only).

#### PUT /products/:id
Update product (vendor only).

#### DELETE /products/:id
Delete product (vendor only).

### Categories

#### GET /categories
Get all product categories.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "category_id",
      "name": "Cotton",
      "slug": "cotton",
      "description": "Cotton fabrics",
      "parentId": null,
      "children": [
        {
          "id": "subcategory_id",
          "name": "Organic Cotton",
          "slug": "organic-cotton"
        }
      ]
    }
  ]
}
```

### Vendors

#### GET /vendors
Get list of vendors.

#### GET /vendors/:id
Get vendor details.

#### POST /vendors
Register as vendor.

#### PUT /vendors/:id
Update vendor profile.

### Orders

#### GET /orders
Get user orders.

#### POST /orders
Create new order.

**Request Body:**
```json
{
  "items": [
    {
      "productId": "product_id",
      "quantity": 2,
      "price": 25.99
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "credit_card"
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

### Reviews

#### GET /products/:id/reviews
Get product reviews.

#### POST /products/:id/reviews
Add product review.

#### PUT /reviews/:id
Update review.

#### DELETE /reviews/:id
Delete review.

### Search

#### GET /search
Advanced search with filters.

**Query Parameters:**
- `q` (string): Search query
- `category` (string): Category filter
- `vendor` (string): Vendor filter
- `priceRange` (string): Price range (e.g., "10-50")
- `rating` (number): Minimum rating
- `sort` (string): Sort field
- `order` (string): Sort order

### Analytics (Vendor)

#### GET /analytics/overview
Get vendor analytics overview.

#### GET /analytics/sales
Get sales analytics.

#### GET /analytics/products
Get product performance analytics.

#### GET /analytics/customers
Get customer analytics.

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {}
  }
}
```

### Common Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `500` - Internal Server Error

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

### Order Status Updates

**Endpoint**: `POST /webhooks/order-status`

**Payload:**
```json
{
  "event": "order.status.updated",
  "data": {
    "orderId": "order_id",
    "status": "shipped",
    "timestamp": "2023-01-01T12:00:00Z"
  }
}
```

### Payment Updates

**Endpoint**: `POST /webhooks/payment`

**Payload:**
```json
{
  "event": "payment.completed",
  "data": {
    "orderId": "order_id",
    "paymentId": "payment_id",
    "amount": 99.99,
    "status": "completed"
  }
}
```

## SDKs and Libraries

### JavaScript/TypeScript

```bash
npm install @fabhub/api-client
```

```typescript
import { FabHubClient } from '@fabhub/api-client';

const client = new FabHubClient({
  apiUrl: 'https://api.fabhub.com/api',
  token: 'your_jwt_token'
});

// Get products
const products = await client.products.list({
  page: 1,
  limit: 20,
  category: 'cotton'
});
```

### Python

```bash
pip install fabhub-api
```

```python
from fabhub import FabHubClient

client = FabHubClient(
    api_url='https://api.fabhub.com/api',
    token='your_jwt_token'
)

# Get products
products = client.products.list(
    page=1,
    limit=20,
    category='cotton'
)
```

## Testing

### Postman Collection

Import the Postman collection for testing:
[Download Collection](https://api.fabhub.com/docs/postman-collection.json)

### API Testing

```bash
# Test authentication
curl -X POST https://api.fabhub.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test product listing
curl -X GET https://api.fabhub.com/api/products \
  -H "Authorization: Bearer your_jwt_token"
```

## Support

For API support:

- **Documentation**: https://docs.fabhub.com
- **Status Page**: https://status.fabhub.com
- **Support Email**: api-support@fabhub.com
- **Discord**: https://discord.gg/fabhub